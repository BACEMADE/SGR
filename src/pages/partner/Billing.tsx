import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, AlertTriangle } from "lucide-react";
import { invoices } from "@/data/mockPartnerData";

const Billing = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-serif text-foreground">Billing</h1>

      {/* Membership */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-sans font-medium">Membership Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-2xl font-serif text-foreground">$299<span className="text-sm font-sans text-muted-foreground">/month</span></p>
              <p className="text-sm text-muted-foreground">Partner Membership</p>
            </div>
            <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200 w-fit">Active</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Next billing date: <span className="text-foreground font-medium">March 1, 2026</span></p>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-sans font-medium">Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-14 rounded-md bg-muted flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 08/2027</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">Update</Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-sans font-medium">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium text-sm">{inv.id}</TableCell>
                  <TableCell className="text-sm">{inv.date}</TableCell>
                  <TableCell className="text-sm">{inv.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                      {inv.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="rounded-full" onClick={() => setShowCancelModal(true)}>
          Pause Membership
        </Button>
        <Button variant="outline" className="rounded-full text-destructive hover:text-destructive" onClick={() => setShowCancelModal(true)}>
          Cancel Membership
        </Button>
      </div>

      {/* Cancel/Pause confirmation modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-foreground/40" onClick={() => setShowCancelModal(false)} />
          <Card className="relative z-50 w-full max-w-md mx-4">
            <CardContent className="p-6 text-center space-y-4">
              <AlertTriangle className="h-10 w-10 text-accent mx-auto" />
              <h3 className="text-lg font-serif text-foreground">Are you sure?</h3>
              <p className="text-sm text-muted-foreground">
                Pausing or cancelling your membership will stop creator visits and content delivery. You can reactivate anytime.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" className="rounded-full" onClick={() => setShowCancelModal(false)}>
                  Keep Membership
                </Button>
                <Button variant="destructive" className="rounded-full" onClick={() => setShowCancelModal(false)}>
                  Confirm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Billing;
