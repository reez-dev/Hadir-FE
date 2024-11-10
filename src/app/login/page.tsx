"use client";

import RsCard from "@/components/atom/card";
import FormBuilder from "@/components/organism/form_builder";
import GradientLayout from "@/components/organism/layout/gradient_layout";
import { loginFormConfig } from "@/config/form_config";
import CardVariant from "@/core/types/card_variant_enum";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleLoginSubmit } from "../../action/login/login_action";

export default function Login() {
  const router = useRouter();
  return (
    <GradientLayout>
      <RsCard
        variant={CardVariant.GRADIENT}
        className="items-center flex flex-col p-6"
      >
        <Image src={"/icon.png"} alt="Hadir Logo" width={70} height={70} />
        <h2 className="mt-4 font-semibold text-xl">Welcome Back</h2>
        <p className="text-xs text-gray-100/80 mt-1">
          Use your admin account to login
        </p>
        <FormBuilder
          fields={loginFormConfig}
          onSubmit={(data) => handleLoginSubmit(data, router)}
        />
      </RsCard>
    </GradientLayout>
  );
}
