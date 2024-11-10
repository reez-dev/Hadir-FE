"use client";

import RsButton from "@/components/atom/button";
import RsCard from "@/components/atom/card";
import GradientLayout from "@/components/organism/layout/gradient_layout";
import CardVariant from "@/core/types/card_variant_enum";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <GradientLayout>
      <Image src={"/icon.png"} alt="Hadir Logo" width={200} height={200} />
      <RsCard variant={CardVariant.GRADIENT} className="sm:w-3/4 p-4">
        <p className="text-center text-sm">
          Easily manage your organization and institution attendance by single
          click provided by Hadir.
        </p>
      </RsCard>
      <RsButton
        text="Login"
        onClick={async () => {
          router.push("/login");
        }}
      />
    </GradientLayout>
  );
}
