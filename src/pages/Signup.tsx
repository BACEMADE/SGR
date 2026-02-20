import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Building2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface BusinessForm {
  businessName: string;
  phone: string;
  streetAddress: string;
  city: string;
  region: string;
  zipCode: string;
  businessType: string;
  instagram: string;
  tiktok: string;
}

const emptyBusiness: BusinessForm = {
  businessName: "",
  phone: "",
  streetAddress: "",
  city: "",
  region: "",
  zipCode: "",
  businessType: "",
  instagram: "",
  tiktok: "",
};

const regions = [
  "Riyadh",
  "Makkah",
  "Madinah",
  "Eastern Province",
  "Asir",
  "Tabuk",
  "Hail",
  "Northern Borders",
  "Jazan",
  "Najran",
  "Al Baha",
  "Al Jawf",
  "Qassim",
];

const businessTypes = [
  "Restaurant",
  "Coffee Shop",
  "Bakery",
  "Cafe",
  "Food Truck",
  "Cloud Kitchen",
  "Other",
];

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businesses, setBusinesses] = useState<BusinessForm[]>([{ ...emptyBusiness }]);

  const updateBusiness = (index: number, field: keyof BusinessForm, value: string) => {
    setBusinesses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addBusiness = () => {
    setBusinesses((prev) => [...prev, { ...emptyBusiness }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle signup
    console.log({ firstName, lastName, email, password, businesses });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex items-start justify-center pt-24 pb-12 px-4">
      <div className="w-full max-w-2xl bg-card rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-serif text-primary">Sufra</h2>
          </Link>
          <h1 className="text-2xl md:text-3xl font-serif text-foreground">
            Let's Get You Started
          </h1>
          <p className="text-muted-foreground">
            Create your account to start connecting with content creators
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Your Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <div>
                <h3 className="text-lg font-serif font-semibold text-foreground">Your Information</h3>
                <p className="text-sm text-muted-foreground">Tell us a little about yourself</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@restaurant.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Business sections */}
          {businesses.map((biz, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-serif font-semibold text-foreground">
                    {businesses.length > 1 ? `Business ${index + 1}` : "Your Business"}
                  </h3>
                  <p className="text-sm text-muted-foreground">Help us find the right creators for you</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Business Name</Label>
                <Input placeholder="Sunset Cafe" value={biz.businessName} onChange={(e) => updateBusiness(index, "businessName", e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label>Phone Number</Label>
                <Input placeholder="+966 5X XXX XXXX" value={biz.phone} onChange={(e) => updateBusiness(index, "phone", e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label>Street Address</Label>
                <Input placeholder="123 Main Street" value={biz.streetAddress} onChange={(e) => updateBusiness(index, "streetAddress", e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>City</Label>
                  <Input placeholder="Riyadh" value={biz.city} onChange={(e) => updateBusiness(index, "city", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Region</Label>
                  <Select value={biz.region} onValueChange={(v) => updateBusiness(index, "region", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Zip Code</Label>
                  <Input placeholder="12345" value={biz.zipCode} onChange={(e) => updateBusiness(index, "zipCode", e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Business Type</Label>
                <Select value={biz.businessType} onValueChange={(v) => updateBusiness(index, "businessType", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Instagram Username (Optional)</Label>
                  <Input placeholder="@yourbusiness" value={biz.instagram} onChange={(e) => updateBusiness(index, "instagram", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>TikTok Username (Optional)</Label>
                  <Input placeholder="@yourbusiness" value={biz.tiktok} onChange={(e) => updateBusiness(index, "tiktok", e.target.value)} />
                </div>
              </div>

              {index < businesses.length - 1 && <Separator />}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full gap-2"
            onClick={addBusiness}
          >
            <Plus className="w-4 h-4" />
            Add Another Business
          </Button>

          <Button type="submit" size="lg" className="w-full rounded-full text-base">
            Create Account
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
