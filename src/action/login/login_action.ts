import RsAPI from "@/core/services/rs_api";
import { RsFormData } from "@/core/types/form_props";
import { ResType } from "@/core/types/response_type";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

export const handleLoginSubmit = async (
  data: RsFormData,
  router: AppRouterInstance
) => {
  const res = await RsAPI<ResType>().post({
    url: "admin/auth/login",
    data: data,
  });
  if (res.success) {
    toast.success(res.message, {
      theme: "dark",
    });
    const token = res.content.session.access_token;
    const expiresIn = res.content.session.expires_in;

    const expiresDate = new Date();
    expiresDate.setSeconds(expiresDate.getSeconds() + expiresIn);

    document.cookie = `token=${token}; path=/; expires=${expiresDate.toUTCString()}; Secure; SameSite=Strict`;
    document.cookie = `token_expiry=${expiresDate.getTime()}; path=/; expires=${expiresDate.toUTCString()}; Secure; SameSite=Strict`;

    router.push("/dashboard");
  }
};
