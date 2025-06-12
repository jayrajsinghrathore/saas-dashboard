"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCustomerAction, updateCustomerAction } from "@/lib/actions"
import type { Customer } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

interface CustomerFormProps {
  customer?: Customer
  onSuccess: () => void
}

export function CustomerForm({ customer, onSuccess }: CustomerFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      let result
      if (customer) {
        formData.append("id", customer.id)
        result = await updateCustomerAction(formData)
      } else {
        result = await createCustomerAction(formData)
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: customer ? "Customer updated successfully" : "Customer created successfully",
        })
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={customer?.name}
            placeholder="Customer name"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={customer?.email}
            placeholder="customer@example.com"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          defaultValue={customer?.company}
          placeholder="Company name"
          required
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={customer?.status || "pending"} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="revenue">Revenue</Label>
          <Input
            id="revenue"
            name="revenue"
            type="number"
            defaultValue={customer?.revenue}
            placeholder="0"
            min="0"
            step="0.01"
            disabled={isLoading}
          /> 
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : customer ? "Update Customer" : "Create Customer"}
        </Button>
      </div>
    </form>
  )
}
