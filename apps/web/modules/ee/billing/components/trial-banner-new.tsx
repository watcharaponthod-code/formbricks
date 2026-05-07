"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/modules/ui/components/badge";
import { Button } from "@/modules/ui/components/button";

export const TRIAL_BASE_RESPONSE_LIMIT = 250;

interface TrialBannerNewProps {
  trialDaysRemaining: number;
  planName: string;
  responseCount: number;
  responseLimit: number | null;
  baseResponseLimit?: number | null;
  billingHref: string;
  hasPaymentMethod?: boolean;
}

export const TrialBannerNew = ({
  trialDaysRemaining,
  planName,
  responseCount,
  responseLimit,
  baseResponseLimit,
  billingHref,
  hasPaymentMethod = false,
}: TrialBannerNewProps) => {
  const { t } = useTranslation();

  const daysLabel = useMemo(() => {
    if (trialDaysRemaining <= 0) return t("common.trial_banner_expired");
    if (trialDaysRemaining === 1) return t("common.trial_banner_one_day_remaining");
    return t("common.trial_banner_days_remaining", { count: trialDaysRemaining });
  }, [trialDaysRemaining, t]);

  const formattedPlanName = planName.charAt(0).toUpperCase() + planName.slice(1);
  const usagePercent = responseLimit ? Math.min((responseCount / responseLimit) * 100, 100) : 0;
  const markerPercent =
    responseLimit && baseResponseLimit ? Math.min((baseResponseLimit / responseLimit) * 100, 100) : null;

  return (
    <div className="m-2">
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">{daysLabel}</span>
          <Badge text={`${formattedPlanName} Trial`} type="gray" size="tiny" />
        </div>

        {responseLimit !== null && (
          <>
            <p className="mb-1.5 text-xs text-slate-500">
              {responseCount.toLocaleString()} /{" "}
              {baseResponseLimit && <s className="mr-1">{baseResponseLimit.toLocaleString()}</s>}
              {responseLimit.toLocaleString()} {t("common.responses").toLowerCase()}
            </p>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${usagePercent}%` }}
              />
              {markerPercent !== null && (
                <div className="absolute inset-y-0 w-px bg-slate-400" style={{ left: `${markerPercent}%` }} />
              )}
            </div>
          </>
        )}

        {!hasPaymentMethod && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={() => posthog.capture("main_nav_add_payment_clicked")}>
            <Link href={billingHref}>{t("environments.settings.billing.add_payment_method")}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
