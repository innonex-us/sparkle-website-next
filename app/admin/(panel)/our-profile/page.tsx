import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDb, collections } from "@/lib/db";
import type { SiteProfile } from "@/lib/types";
import { OurProfileForm } from "./our-profile-form";

const PROFILE_DOC_ID = "main";

export default async function OurProfilePage() {
  const db = await getDb();
  const doc = await db
    .collection<SiteProfile>(collections.siteProfile)
    .findOne({ _id: PROFILE_DOC_ID as never });

  return (
    <div>
      <h1 className="text-2xl font-bold">Our Profile</h1>
      <p className="mt-1 text-muted-foreground">
        Upload the company profile PDF that visitors can download from the website.
      </p>
      <Card className="mt-8 max-w-2xl">
        <CardHeader>
          <CardTitle>Company Profile PDF</CardTitle>
          <CardDescription>
            This PDF will be available as a download button in the &quot;Our Profile&quot; section on the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OurProfileForm currentPdfUrl={doc?.pdfUrl ?? ""} />
        </CardContent>
      </Card>
    </div>
  );
}
