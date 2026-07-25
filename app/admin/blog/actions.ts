"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type {
  BlogFormState,
  BlogFormValues,
} from "@/components/admin/BlogForm";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

function getValidBlogId(value: number) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error("Invalid blog ID.");
  }

  return value;
}

function getSafeReturnPath(value: string) {
  if (
    !value.startsWith("/admin/blog") ||
    value.startsWith("//") ||
    value.includes("://")
  ) {
    return "/admin/blog";
  }

  return value;
}

function appendMessage(
  returnPath: string,
  key: "message" | "error",
  message: string,
) {
  const separator = returnPath.includes("?") ? "&" : "?";

  return `${returnPath}${separator}${key}=${encodeURIComponent(
    message,
  )}`;
}

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

function getFormString(
  formData: FormData,
  fieldName: string,
) {
  const value = formData.get(fieldName);

  return typeof value === "string" ? value.trim() : "";
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseTags(value: string) {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  );
}

function parseBlogFormData(
  formData: FormData,
): BlogFormValues {
  return {
    title: getFormString(formData, "title"),
    slug: normalizeSlug(
      getFormString(formData, "slug"),
    ),
    excerpt: getFormString(formData, "excerpt"),
    content: getFormString(formData, "content"),
    category: getFormString(formData, "category"),
    tags: parseTags(getFormString(formData, "tags")),
    readingTime: getFormString(
      formData,
      "readingTime",
    ),
    author: getFormString(formData, "author"),
    coverImage: getFormString(
      formData,
      "coverImage",
    ),
    featured: formData.get("featured") === "true",
    published: formData.get("published") === "true",
  };
}

function validateBlogValues(
  values: BlogFormValues,
): BlogFormState["errors"] {
  const errors: BlogFormState["errors"] = {};

  if (!values.title) {
    errors.title = "Blog title is required.";
  } else if (values.title.length < 5) {
    errors.title =
      "Blog title must contain at least 5 characters.";
  } else if (values.title.length > 200) {
    errors.title =
      "Blog title cannot exceed 200 characters.";
  }

  if (!values.slug) {
    errors.slug = "URL slug is required.";
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.slug)) {
    errors.slug =
      "Slug may contain lowercase letters, numbers and hyphens only.";
  } else if (values.slug.length > 200) {
    errors.slug =
      "URL slug cannot exceed 200 characters.";
  }

  if (!values.excerpt) {
    errors.excerpt = "Blog excerpt is required.";
  } else if (values.excerpt.length < 20) {
    errors.excerpt =
      "Blog excerpt must contain at least 20 characters.";
  } else if (values.excerpt.length > 500) {
    errors.excerpt =
      "Blog excerpt cannot exceed 500 characters.";
  }

  if (!values.content) {
    errors.content = "Blog content is required.";
  } else if (values.content.length < 50) {
    errors.content =
      "Blog content must contain at least 50 characters.";
  }

  if (!values.category) {
    errors.category = "Blog category is required.";
  } else if (values.category.length > 100) {
    errors.category =
      "Category cannot exceed 100 characters.";
  }

  if (!values.author) {
    errors.author = "Author name is required.";
  } else if (values.author.length > 150) {
    errors.author =
      "Author name cannot exceed 150 characters.";
  }

  if (!values.readingTime) {
    errors.readingTime = "Reading time is required.";
  } else if (values.readingTime.length > 50) {
    errors.readingTime =
      "Reading time cannot exceed 50 characters.";
  }

  if (
    values.coverImage &&
    !values.coverImage.startsWith("/") &&
    !/^https?:\/\//i.test(values.coverImage)
  ) {
    errors.coverImage =
      "Cover image must be a public path starting with / or a complete HTTP URL.";
  }

  if (values.tags.length > 20) {
    errors.tags =
      "A blog article can contain a maximum of 20 tags.";
  }

  return errors;
}

function hasValidationErrors(
  errors: BlogFormState["errors"],
) {
  return Object.keys(errors).length > 0;
}

export async function createBlog(
  previousState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  await requireAdmin();

  const values = parseBlogFormData(formData);
  const errors = validateBlogValues(values);

  if (hasValidationErrors(errors)) {
    return {
      success: false,
      message:
        "Please correct the highlighted fields and try again.",
      errors,
      values,
    };
  }

  const supabase = await createClient();

  const { data: existingBlog, error: slugCheckError } =
    await supabase
      .from("blogs")
      .select("id")
      .eq("slug", values.slug)
      .maybeSingle();

  if (slugCheckError) {
    return {
      success: false,
      message:
        "Unable to verify the blog URL slug.",
      errors: {
        form: slugCheckError.message,
      },
      values,
    };
  }

  if (existingBlog) {
    return {
      success: false,
      message:
        "A blog article with this URL slug already exists.",
      errors: {
        slug:
          "Choose a different URL slug for this article.",
      },
      values,
    };
  }

  const now = new Date().toISOString();

  const { error: insertError } = await supabase
    .from("blogs")
    .insert({
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt,
      content: values.content,
      category: values.category,
      tags: values.tags,
      reading_time: values.readingTime,
      author: values.author,
      cover_image: values.coverImage,
      featured: values.featured,
      published: values.published,
      published_at: now,
      updated_at: now,
    });

  if (insertError) {
    const duplicateSlug =
      insertError.code === "23505";

    return {
      success: false,
      message: duplicateSlug
        ? "A blog article with this URL slug already exists."
        : "Unable to create the blog article.",
      errors: duplicateSlug
        ? {
            slug:
              "Choose a different URL slug for this article.",
          }
        : {
            form: insertError.message,
          },
      values,
    };
  }

  revalidateBlogPaths(values.slug);

  redirect(
    `/admin/blog?message=${encodeURIComponent(
      `${values.title} was created successfully.`,
    )}`,
  );
}

export async function updateBlog(
  previousState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  await requireAdmin();

  const blogIdValue = getFormString(formData, "blogId");
  const blogId = Number(blogIdValue);

  if (!Number.isInteger(blogId) || blogId <= 0) {
    return {
      success: false,
      message: "Unable to update the blog article.",
      errors: {
        form: "Invalid blog ID.",
      },
    };
  }

  const values = parseBlogFormData(formData);
  const errors = validateBlogValues(values);

  if (hasValidationErrors(errors)) {
    return {
      success: false,
      message:
        "Please correct the highlighted fields and try again.",
      errors,
      values,
    };
  }

  const supabase = await createClient();

  const { data: existingBlog, error: readError } =
    await supabase
      .from("blogs")
      .select("id, title, slug")
      .eq("id", blogId)
      .maybeSingle();

  if (readError) {
    return {
      success: false,
      message: "Unable to load the blog article.",
      errors: {
        form: readError.message,
      },
      values,
    };
  }

  if (!existingBlog) {
    return {
      success: false,
      message: "The blog article was not found.",
      errors: {
        form:
          "This article may have been deleted. Return to the blog list and try again.",
      },
      values,
    };
  }

  const { data: duplicateBlog, error: slugCheckError } =
    await supabase
      .from("blogs")
      .select("id")
      .eq("slug", values.slug)
      .neq("id", blogId)
      .maybeSingle();

  if (slugCheckError) {
    return {
      success: false,
      message:
        "Unable to verify the blog URL slug.",
      errors: {
        form: slugCheckError.message,
      },
      values,
    };
  }

  if (duplicateBlog) {
    return {
      success: false,
      message:
        "A blog article with this URL slug already exists.",
      errors: {
        slug:
          "Choose a different URL slug for this article.",
      },
      values,
    };
  }

  const { error: updateError } = await supabase
    .from("blogs")
    .update({
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt,
      content: values.content,
      category: values.category,
      tags: values.tags,
      reading_time: values.readingTime,
      author: values.author,
      cover_image: values.coverImage,
      featured: values.featured,
      published: values.published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", blogId);

  if (updateError) {
    const duplicateSlug =
      updateError.code === "23505";

    return {
      success: false,
      message: duplicateSlug
        ? "A blog article with this URL slug already exists."
        : "Unable to update the blog article.",
      errors: duplicateSlug
        ? {
            slug:
              "Choose a different URL slug for this article.",
          }
        : {
            form: updateError.message,
          },
      values,
    };
  }

  revalidateBlogPaths(existingBlog.slug);

  if (existingBlog.slug !== values.slug) {
    revalidateBlogPaths(values.slug);
  }

  redirect(
    `/admin/blog?message=${encodeURIComponent(
      `${values.title} was updated successfully.`,
    )}`,
  );
}

export async function toggleBlogFeatured(
  blogId: number,
  featured: boolean,
  returnPath: string,
) {
  await requireAdmin();

  const id = getValidBlogId(blogId);
  const safeReturnPath = getSafeReturnPath(returnPath);
  const supabase = await createClient();

  const { data: blog, error: readError } = await supabase
    .from("blogs")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  if (readError) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        readError.message,
      ),
    );
  }

  if (!blog) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        "Blog post was not found.",
      ),
    );
  }

  const { error } = await supabase
    .from("blogs")
    .update({
      featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        error.message,
      ),
    );
  }

  revalidateBlogPaths(blog.slug);

  redirect(
    appendMessage(
      safeReturnPath,
      "message",
      featured
        ? "Blog post added to featured articles."
        : "Blog post removed from featured articles.",
    ),
  );
}

export async function toggleBlogPublished(
  blogId: number,
  published: boolean,
  returnPath: string,
) {
  await requireAdmin();

  const id = getValidBlogId(blogId);
  const safeReturnPath = getSafeReturnPath(returnPath);
  const supabase = await createClient();

  const { data: blog, error: readError } = await supabase
    .from("blogs")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  if (readError) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        readError.message,
      ),
    );
  }

  if (!blog) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        "Blog post was not found.",
      ),
    );
  }

  const { error } = await supabase
    .from("blogs")
    .update({
      published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        error.message,
      ),
    );
  }

  revalidateBlogPaths(blog.slug);

  redirect(
    appendMessage(
      safeReturnPath,
      "message",
      published
        ? "Blog post published successfully."
        : "Blog post moved to draft.",
    ),
  );
}

export async function deleteBlog(
  blogId: number,
  returnPath: string,
) {
  await requireAdmin();

  const id = getValidBlogId(blogId);
  const safeReturnPath = getSafeReturnPath(returnPath);
  const supabase = await createClient();

  const { data: blog, error: readError } = await supabase
    .from("blogs")
    .select("title, slug")
    .eq("id", id)
    .maybeSingle();

  if (readError) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        readError.message,
      ),
    );
  }

  if (!blog) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        "Blog post was not found.",
      ),
    );
  }

  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id);

  if (error) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        error.message,
      ),
    );
  }

  revalidateBlogPaths(blog.slug);

  redirect(
    `/admin/blog?message=${encodeURIComponent(
      `${blog.title} was deleted successfully.`,
    )}`,
  );
}