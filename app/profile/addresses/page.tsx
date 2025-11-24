'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  MapPin, Plus, Edit, Trash2, Check, X, Loader2, Home, Building2, 
  Briefcase, Save, Star
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BottomNav } from '@/components/bottom-nav'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const addressSchema = z.object({
  label: z.string().min(2, 'Label must be at least 2 characters').max(50, 'Label must be less than 50 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name must be less than 100 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  addressLine1: z.string().min(5, 'Address must be at least 5 characters').max(200, 'Address must be less than 200 characters'),
  addressLine2: z.string().max(200, 'Address must be less than 200 characters').optional().or(z.literal('')),
  city: z.string().min(2, 'City must be at least 2 characters').max(100, 'City must be less than 100 characters'),
  state: z.string().min(2, 'State must be at least 2 characters').max(100, 'State must be less than 100 characters'),
  pincode: z.string()
    .min(6, 'Pincode must be at least 6 digits')
    .regex(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
  landmark: z.string().max(200, 'Landmark must be less than 200 characters').optional().or(z.literal('')),
  isDefault: z.boolean().default(false),
})

type AddressFormValues = z.infer<typeof addressSchema>

interface Address extends AddressFormValues {
  id: string
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      fullName: 'Jane Doe',
      phone: '9876543210',
      addressLine1: '123 Main Street',
      addressLine2: 'Apartment 4B',
      city: 'San Francisco',
      state: 'California',
      pincode: '94102',
      landmark: 'Near Central Park',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Work',
      fullName: 'Jane Doe',
      phone: '9876543211',
      addressLine1: '456 Business Avenue',
      addressLine2: 'Suite 200',
      city: 'San Francisco',
      state: 'California',
      pincode: '94105',
      landmark: 'Opposite Tech Tower',
      isDefault: false,
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null)

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: 'Home',
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false,
    },
  })

  const isLoading = form.formState.isSubmitting

  const handleOpenAddDialog = () => {
    setEditingAddress(null)
    form.reset({
      label: 'Home',
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false,
    })
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (address: Address) => {
    setEditingAddress(address)
    form.reset({
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      landmark: address.landmark || '',
      isDefault: address.isDefault,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (addressId: string) => {
    setAddressToDelete(addressId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (addressToDelete) {
      setAddresses(addresses.filter(addr => addr.id !== addressToDelete))
      setDeleteDialogOpen(false)
      setAddressToDelete(null)
    }
  }

  const onSubmit = async (data: AddressFormValues) => {
    // If setting as default, unset other defaults
    if (data.isDefault) {
      setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })))
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addr, ...data }
          : addr
      ))
    } else {
      // Add new address
      const newAddress: Address = {
        ...data,
        id: Date.now().toString(),
      }
      setAddresses([...addresses, newAddress])
    }

    setIsDialogOpen(false)
    form.reset()
    console.log('Address saved:', data)
  }

  const getLabelIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home':
        return Home
      case 'work':
        return Briefcase
      case 'office':
        return Building2
      default:
        return MapPin
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <PageHeader
          backButton={{
            href: '/profile'
          }}
          title="Manage Addresses"
          subtitle="Add, edit, or remove your delivery addresses"
          sticky
        />

        <div className="px-4 lg:px-6 py-6 space-y-6">
          {/* Add Address Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleOpenAddDialog}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Address</span>
            </Button>
          </div>

          {/* Addresses List */}
          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/30 rounded-2xl">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No addresses yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Add your first address to get started with deliveries
              </p>
              <Button
                onClick={handleOpenAddDialog}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {addresses.map((address) => {
                const LabelIcon = getLabelIcon(address.label)
                return (
                  <div
                    key={address.id}
                    className="bg-muted/30 rounded-2xl p-6 space-y-4 hover:bg-muted/50 border transition-colors relative group"
                  >
                    {/* Default Badge */}
                    {address.isDefault && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        <Star className="w-3 h-3 fill-primary" />
                        Default
                      </div>
                    )}

                    {/* Label */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <LabelIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{address.label}</h3>
                        <p className="text-sm text-muted-foreground">{address.fullName}</p>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="space-y-2 text-sm">
                      <p className="text-foreground leading-relaxed">
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                      </p>
                      <p className="text-muted-foreground">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      {address.landmark && (
                        <p className="text-muted-foreground text-xs">
                          Landmark: {address.landmark}
                        </p>
                      )}
                      <p className="text-muted-foreground">
                        Phone: {address.phone}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-border/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEditDialog(address)}
                        className="flex-1 hover:bg-primary/10 hover:text-primary"
                      >
                        <Edit className="w-4 h-4 mr-1.5" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(address.id)}
                        className="flex-1 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
            <DialogDescription>
              {editingAddress 
                ? 'Update your address information below'
                : 'Fill in the details to add a new delivery address'
              }
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Address Label */}
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Address Label
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-background border-2 border-border rounded-xl">
                          <SelectValue placeholder="Select label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="Work">Work</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="h-12 bg-background border-2 border-border rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">+91</span>
                        <Input
                          type="tel"
                          placeholder="9876543210"
                          className="h-12 pl-14 bg-background border-2 border-border rounded-xl"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Line 1 */}
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Street address, house number"
                        className="h-12 bg-background border-2 border-border rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Line 2 */}
              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Apartment, suite, unit, etc."
                        className="h-12 bg-background border-2 border-border rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City, State, Pincode Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City"
                          className="h-12 bg-background border-2 border-border rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="State"
                          className="h-12 bg-background border-2 border-border rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="123456"
                          className="h-12 bg-background border-2 border-border rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Landmark */}
              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Landmark (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nearby landmark or reference point"
                        className="h-12 bg-background border-2 border-border rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Set as Default */}
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                    <FormControl>
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={field.value}
                          onChange={field.onChange}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-border rounded-md bg-background flex items-center justify-center transition-all peer-checked:bg-primary peer-checked:border-primary">
                          {field.value && (
                            <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormLabel htmlFor="isDefault" className="cursor-pointer flex-1">
                      Set as default address
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {editingAddress ? 'Update Address' : 'Add Address'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Address?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this address? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAddressToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav />
    </main>
  )
}

