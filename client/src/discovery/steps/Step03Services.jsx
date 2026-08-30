import { useDispatch, useSelector } from 'react-redux';
import Question from '../components/Question.jsx';
import { TextInput, TextArea } from '../components/Inputs.jsx';
import { RadioGroup } from '../components/ChoiceGroups.jsx';
import ConditionalReveal from '../components/ConditionalReveal.jsx';
import DynamicList from '../components/DynamicList.jsx';
import { SingleUpload } from '../components/FileUpload.jsx';
import { useBind, useField, useErrors } from '../useBind.js';
import { useDT } from '../data/i18n.js';
import {
  addProduct,
  updateProduct,
  removeProduct,
} from '../store/discoverySlice.js';
import {
  OFFERING_TYPES,
  QUANTITIES,
  PRICE_OPTIONS,
  YES_NO,
  YES_NO_SOMETIMES,
} from '../data/options.js';

export default function Step03Services() {
  const dispatch = useDispatch();
  const { set } = useBind();
  const errors = useErrors();
  const t = useDT();

  const offeringType = useField('services.offeringType');
  const quantity = useField('services.quantity');
  const products = useSelector((s) => s.discovery.form.services.products);
  const showPrices = useField('services.showPrices');
  const hasPackages = useField('services.hasPackages');
  const packageDetails = useField('services.packageDetails');
  const hasOffers = useField('services.hasOffers');
  const offerDetails = useField('services.offerDetails');

  // Choose the singular noun ('product' / 'service' / 'offering') for phrasing.
  const nounKey =
    offeringType === 'Services'
      ? 'service'
      : offeringType === 'Products'
      ? 'product'
      : 'offering';
  const noun = t(`noun.${nounKey}`);
  const nounCap = t(`nounCap.${nounKey}`);

  return (
    <div className="space-y-2">
      <Question
        number="Q1"
        label={t('s2.q1.label')}
        required
        error={errors['services.offeringType']}
      >
        <RadioGroup
          options={OFFERING_TYPES}
          value={offeringType}
          onChange={(v) => set('services.offeringType', v)}
        />
      </Question>

      <Question number="Q2" label={t('s2.q2.label', { noun })} optional>
        <RadioGroup
          options={QUANTITIES}
          value={quantity}
          onChange={(v) => set('services.quantity', v)}
        />
      </Question>

      <Question
        number="Q3"
        label={t('s2.q3.label', { noun })}
        description={t('s2.q3.desc')}
        optional
      >
        <DynamicList
          items={products}
          onAdd={() => dispatch(addProduct())}
          onRemove={(id) => dispatch(removeProduct(id))}
          renderItem={(p) => (
            <ProductRow
              product={p}
              onChange={(patch) => dispatch(updateProduct({ id: p.id, patch }))}
              noun={noun}
            />
          )}
          itemLabel={(i) => t('s2.q3.itemLabel', { Noun: nounCap, n: String(i + 1).padStart(2, '0') })}
          addLabel={t('s2.q3.addLabel', { noun })}
          emptyLabel={t('s2.q3.emptyLabel', { noun })}
        />
      </Question>

      <Question number="Q4" label={t('s2.q4.label')} optional>
        <RadioGroup
          options={PRICE_OPTIONS}
          value={showPrices}
          onChange={(v) => set('services.showPrices', v)}
          columns={2}
        />
      </Question>

      <Question number="Q5" label={t('s2.q5.label')} optional>
        <RadioGroup
          options={YES_NO}
          value={hasPackages}
          onChange={(v) => set('services.hasPackages', v)}
        />
        <ConditionalReveal show={hasPackages === 'Yes'}>
          <TextArea
            value={packageDetails}
            onChange={(v) => set('services.packageDetails', v)}
            placeholder={t('s2.q5.placeholder')}
            rows={4}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q6" label={t('s2.q6.label')} optional>
        <RadioGroup
          options={YES_NO_SOMETIMES}
          value={hasOffers}
          onChange={(v) => set('services.hasOffers', v)}
        />
        <ConditionalReveal show={hasOffers === 'Yes' || hasOffers === 'Sometimes'}>
          <TextArea
            value={offerDetails}
            onChange={(v) => set('services.offerDetails', v)}
            placeholder={t('s2.q6.placeholder')}
            rows={4}
          />
        </ConditionalReveal>
      </Question>
    </div>
  );
}

function ProductRow({ product, onChange, noun }) {
  const t = useDT();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-3">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
            {t('product.name')}
          </label>
          <TextInput
            value={product.name}
            onChange={(v) => onChange({ name: v })}
            placeholder={t('product.namePlaceholder', { noun })}
          />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
            {t('product.description')}
          </label>
          <TextArea
            value={product.description}
            onChange={(v) => onChange({ description: v })}
            placeholder={t('product.descriptionPlaceholder')}
            rows={2}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
              {t('product.price')}
            </label>
            <TextInput
              value={product.price}
              onChange={(v) => onChange({ price: v })}
              placeholder={t('product.pricePlaceholder')}
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
              {t('product.featureThis')}
            </label>
            <button
              type="button"
              onClick={() => onChange({ featured: !product.featured })}
              className={`w-full h-[46px] rounded-xl border font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                product.featured
                  ? 'border-brand-orange bg-brand-orange text-paper-50'
                  : 'border-ink-900/12 bg-paper-50 text-ink-600 hover:border-ink-900/25'
              }`}
            >
              {product.featured ? t('product.featured') : t('product.setFeatured')}
            </button>
          </div>
        </div>
      </div>
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
          {t('product.image')}
        </label>
        <SingleUpload
          value={product.image}
          onChange={(v) => onChange({ image: v })}
          label={t('product.imageLabel')}
          compact
        />
      </div>
    </div>
  );
}
