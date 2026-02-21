import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { creator } from "@/data/mockCreatorData";
import { useToast } from "@/hooks/use-toast";

const CreatorProfile = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ ...creator });

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlatformChange = (platform: string, value: string) => {
    setForm((prev) => ({ ...prev, platforms: { ...prev.platforms, [platform]: value } }));
  };

  const handleSave = () => {
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-serif text-foreground">Profile</h1>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>City</Label>
              <Input value={form.city} onChange={(e) => handleChange("city", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Social Platforms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Instagram Handle</Label>
              <Input value={form.platforms.instagram} onChange={(e) => handlePlatformChange("instagram", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>TikTok Handle</Label>
              <Input value={form.platforms.tiktok} onChange={(e) => handlePlatformChange("tiktok", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Instagram Followers</Label>
              <Input type="number" value={form.instagramFollowers} onChange={(e) => handleChange("instagramFollowers", Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>TikTok Followers</Label>
              <Input type="number" value={form.tiktokFollowers} onChange={(e) => handleChange("tiktokFollowers", Number(e.target.value))} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
};

export default CreatorProfile;
