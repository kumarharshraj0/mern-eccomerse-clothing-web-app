import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAccount } from "@/hooks/useAccount";
import AccountHeader from "@/components/account/AccountHeader";
import AccountDetailsSection from "@/components/account/AccountDetailsSection";
import AccountActivitySidebar from "@/components/account/AccountActivitySidebar";

const Account = () => {
  const acc = useAccount();

  if (acc.loading && !acc.user) {
    return (
      <div className="max-w-5xl mx-auto p-12 lg:p-20 space-y-12">
        <div className="flex items-center gap-6">
          <Skeleton className="w-40 h-40 rounded-[2.5rem]" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-6 w-60" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] rounded-[2.5rem]" />
          <Skeleton className="h-[400px] rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  if (!acc.user) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <AccountHeader 
          user={acc.user} 
          profileImage={acc.profileImage} 
          selectedImage={acc.selectedImage} 
          setSelectedImage={acc.setSelectedImage} 
          isUploading={acc.isUploading} 
          handleUpload={acc.handleUpload} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AccountDetailsSection 
            user={acc.user} 
            handleChangePassword={acc.handleChangePassword} 
            logout={acc.logout} 
          />
          <AccountActivitySidebar />
        </div>
      </div>
    </div>
  );
};

export default Account;


