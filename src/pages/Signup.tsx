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
import { User, Building2, Plus, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

type SignupRole = "partner" | "creator";

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
  "Riyadh", "Makkah", "Madinah", "Eastern Province", "Asir",
  "Tabuk", "Hail", "Northern Borders", "Jazan", "Najran",
  "Al Baha", "Al Jawf", "Qassim",
];

const businessTypes = [
  "Restaurant", "Coffee Shop", "Bakery", "Cafe", "Food Truck", "Cloud Kitchen", "Other",
];

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState<SignupRole | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businesses, setBusinesses] = useState<BusinessForm[]>([{ ...emptyBusiness }]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const updateBusiness = (index: number, field: keyof BusinessForm, value: string) => {
    setBusinesses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addBusiness = () => setBusinesses((prev) => [...prev, { ...emptyBusiness }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    const fullName = `${firstName} ${lastName}`.trim();
    const { error } = await signUp(email, password, fullName, selectedRole);
    setIsLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Account created! Please check your email to verify your account, then log in.");
    navigate("/login");
  };

  if (!selectedRole) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center pt-20 pb-8 px-3 md:px-4">
          <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8 md:p-10 space-y-6">
            <div className="text-center space-y-2">
              <Link to="/" className="inline-block">
                <h2 className="text-3xl font-serif text-primary">Sufra</h2>
              </Link>
              <h1 className="text-2xl md:text-3xl font-serif text-foreground">Join Sufra</h1>
              <p className="text-muted-foreground text-sm">How would you like to use Sufra?</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setSelectedRole("partner")}
                className="w-full flex items-center gap-4 p-5 rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 transition-colors text-left"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary shrink-0">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Restaurant Partner</p>
                  <p className="text-sm text-muted-foreground">I own or manage a restaurant</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("creator")}
                className="w-full flex items-center gap-4 p-5 rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 transition-colors text-left"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary shrink-0">
                  <Camera className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Content Creator</p>
                  <p className="text-sm text-muted-foreground">I create food & lifestyle content</p>
                </div>
              </button>

              <p className="text-center text-sm text-muted-foreground pt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex items-start justify-center pt-20 md:pt-24 pb-8 md:pb-12 px-3 md:px-4">
        <div className="w-full max-w-2xl bg-card rounded-2xl shadow-lg p-5 sm:p-8 md:p-12 space-y-6 md:space-y-8">
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-serif text-primary">Sufra</h2>
            </Link>
            <h1 className="text-2xl md:text-3xl font-serif text-foreground">
              {selectedRole === "partner" ? "Partner Registration" : "Creator Registration"}
            </h1>
            <p className="text-muted-foreground">
              {selectedRole === "partner"
                ? "Create your account to start connecting with content creators"
                : "Create your account to discover restaurant opportunities"}
            </p>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-sm text-primary hover:underline font-medium"
            >
              ← Choose a different role
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
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
                  <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              </div>
            </div>

            {selectedRole === "partner" && (
              <>
                <Separator />
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
                          <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                          <SelectContent>
                            {regions.map((r) => (<SelectItem key={r} value={r}>{r}</SelectItem>))}
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
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
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

                <Button type="button" variant="outline" className="w-full rounded-full gap-2" onClick={addBusiness}>
                  <Plus className="w-4 h-4" /> Add Another Business
                </Button>
              </>
            )}

            {selectedRole === "creator" && (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="text-lg font-serif font-semibold text-foreground">Creator Details</h3>
                      <p className="text-sm text-muted-foreground">Optional — you can fill these in later from your profile</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Instagram Handle</Label>
                      <Input placeholder="@yourhandle" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>TikTok Handle</Label>
                      <Input placeholder="@yourhandle" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>City</Label>
                    <Input placeholder="Riyadh" />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" size="lg" disabled={isLoading} className="w-full rounded-full text-base">
              {isLoading ? "Creating Account…" : "Create Account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
