import { notFound } from "next/navigation";

import ToolForm, {
  type ToolFormValues,
} from "@/components/admin/ToolForm";
import { requireAdmin } from "@/lib/admin";
import { getToolById } from "@/lib/tools";

import { updateTool } from "../../actions";

type EditToolPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getToolId(id: string): number | null {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}

function toInitialValues(
  tool: NonNullable<Awaited<ReturnType<typeof getToolById>>>,
): ToolFormValues {
  return {
    name: tool.name,
    company: tool.company,
    slug: tool.slug,
    website: tool.website,
    logo: tool.logo,
    coverImage: tool.coverImage,
    category: tool.category,
    tags: tool.tags,
    description: tool.description,
    pricing: tool.pricing,
    rating: tool.rating,
    founded: tool.founded,
    users: tool.users,
    platforms: tool.platforms,
    features: tool.features,
    pros: tool.pros,
    cons: tool.cons,
    useCases: tool.useCases,
    integrations: tool.integrations,
    api: tool.api,
    openSource: tool.openSource,
    languages: tool.languages,
    featured: tool.featured,
  };
}

export default async function EditToolPage({
  params,
}: EditToolPageProps) {
  await requireAdmin();

  const { id } = await params;
  const toolId = getToolId(id);

  if (!toolId) {
    notFound();
  }

  const tool = await getToolById(toolId);

  if (!tool) {
    notFound();
  }

  const initialValues = toInitialValues(tool);
  const action = updateTool.bind(null, tool.id);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-sky-600">
          Admin Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Edit {tool.name}
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Update the tool information and save your changes.
        </p>
      </div>

      <ToolForm
        mode="edit"
        action={action}
        initialValues={initialValues}
      />
    </div>
  );
}