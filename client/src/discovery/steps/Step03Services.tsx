import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { BriefProduct } from "@/types";
import { RadioGroup } from "../components/ChoiceGroups";
import ConditionalReveal from "../components/ConditionalReveal";
import DynamicList from "../components/DynamicList";
import { SingleUpload } from "../components/FileUpload";
import { TextArea, TextInput } from "../components/Inputs";
import Question from "../components/Question";
import { useDT } from "../data/i18n";
import {
  OFFERING_TYPES,
  PRICE_OPTIONS,
  QUANTITIES,
  YES_NO,
  YES_NO_SOMETIMES,
} from "../data/options";
import { addProduct, removeProduct, updateProduct } from "../store/discoverySlice";
import { useBind, useErrors, useField } from "../useBind";

export default function Step03Services() {
  const dispatch = useAppDispatch();
  const { set } = useBind();
  const errors = useErrors();
  const t = useDT();

  const offeringType = useField<string>("services.offeringType");
  const quantity = useField<string>("services.quantity");
  const products = useAppSelector((s) => s.discovery.form.services.products);
  const showPrices = useField<string>("services.showPrices");
  const hasPackages = useField<string>("services.hasPackages");
  const packageDetails = useField<string>("services.packageDetails");
  const hasOffers = useField<string>("services.hasOffers");
  const offerDetails = useField<string>("services.offerDetails");

  // Phrasing follows what the client says they sell.
  const nounKey =
    offeringType === "Services" ? "service" : offeringType === "Products" ? "product" : "offering";
  const noun = t(`noun.${nounKey}`);
  const nounCap = t(`nounCap.${nounKey}`);

  return (
    <div className="space-y-2">
      <Question
        number="Q1"
        label={t("s2.q1.label")}
        required
        error={errors["services.offeringType"]}
      >
        <RadioGroup
          options={OFFERING_TYPES}
          value={offeringType}
          onChange={(v) => set("services.offeringType", v)}
        />
      </Question>

      <Question number="Q2" label={t("s2.q2.label", { noun })} optional>
        <RadioGroup
          options={QUANTITIES}
          value={quantity}
          onChange={(v) => set("services.quantity", v)}
        />
      </Question>

      <Question
        number="Q3"
        label={t("s2.q3.label", { noun })}
        description={t("s2.q3.desc")}
        optional
      >
        <DynamicList
          items={products}
          onAdd={() => dispatch(addProduct())}
          onRemove={(id) => dispatch(removeProduct(id))}
          renderItem={(product) => (
            <ProductRow
              product={product}
              noun={noun}
              onChange={(patch) => dispatch(updateProduct({ id: product.id, patch }))}
            />
          )}
          itemLabel={(i) =>
            t("s2.q3.itemLabel", { Noun: nounCap, n: String(i + 1).padStart(2, "0") })
          }
          addLabel={t("s2.q3.addLabel", { noun })}
          emptyLabel={t("s2.q3.emptyLabel", { noun })}
        />
      </Question>

      <Question number="Q4" label={t("s2.q4.label")} optional>
        <RadioGroup
          options={PRICE_OPTIONS}
          value={showPrices}
          onChange={(v) => set("services.showPrices", v)}
          columns={2}
        />
      </Question>

      <Question number="Q5" label={t("s2.q5.label")} optional>
        <RadioGroup
          options={YES_NO}
          value={hasPackages}
          onChange={(v) => set("services.hasPackages", v)}
        />
        <ConditionalReveal show={hasPackages === "Yes"}>
          <TextArea
            value={packageDetails}
            onChange={(v) => set("services.packageDetails", v)}
            placeholder={t("s2.q5.placeholder")}
            rows={4}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q6" label={t("s2.q6.label")} optional>
        <RadioGroup
          options={YES_NO_SOMETIMES}
          value={hasOffers}
          onChange={(v) => set("services.hasOffers", v)}
        />
        <ConditionalReveal show={hasOffers === "Yes" || hasOffers === "Sometimes"}>
          <TextArea
            value={offerDetails}
            onChange={(v) => set("services.offerDetails", v)}
            placeholder={t("s2.q6.placeholder")}
            rows={4}
          />
        </ConditionalReveal>
      </Question>
    </div>
  );
}

interface ProductRowProps {
  product: BriefProduct;
  noun: string;
  onChange: (patch: Partial<BriefProduct>) => void;
}

function ProductRow({ product, noun, onChange }: ProductRowProps) {
  const t = useDT();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="space-y-3 md:col-span-2">
        <div>
          <FieldLabel>{t("product.name")}</FieldLabel>
          <TextInput
            value={product.name}
            onChange={(v) => onChange({ name: v })}
            placeholder={t("product.namePlaceholder", { noun })}
          />
        </div>

        <div>
          <FieldLabel>{t("product.description")}</FieldLabel>
          <TextArea
            value={product.description}
            onChange={(v) => onChange({ description: v })}
            placeholder={t("product.descriptionPlaceholder")}
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>{t("product.price")}</FieldLabel>
            <TextInput
              value={product.price}
              onChange={(v) => onChange({ price: v })}
              placeholder={t("product.pricePlaceholder")}
            />
          </div>
          <div>
            <FieldLabel>{t("product.featureThis")}</FieldLabel>
            <button
              type="button"
              onClick={() => onChange({ featured: !product.featured })}
              aria-pressed={product.featured}
              className={`h-[46px] w-full rounded-xl border font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                product.featured
                  ? "border-brand-orange bg-brand-orange text-paper-50"
                  : "border-ink-900/12 bg-paper-50 text-ink-600 hover:border-ink-900/25"
              }`}
            >
              {product.featured ? t("product.featured") : t("product.setFeatured")}
            </button>
          </div>
        </div>
      </div>

      <div>
        <FieldLabel>{t("product.image")}</FieldLabel>
        <SingleUpload
          value={product.image}
          onChange={(file) => onChange({ image: file })}
          label={t("product.imageLabel")}
          compact
        />
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
      {children}
    </label>
  );
}
