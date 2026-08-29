import { useDispatch, useSelector } from 'react-redux';
import Question from '../components/Question.jsx';
import { TextInput, TextArea } from '../components/Inputs.jsx';
import { RadioGroup } from '../components/ChoiceGroups.jsx';
import ConditionalReveal from '../components/ConditionalReveal.jsx';
import DynamicList from '../components/DynamicList.jsx';
import { SingleUpload } from '../components/FileUpload.jsx';
import { useBind, useField, useErrors } from '../useBind.js';
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

  const offeringType = useField('services.offeringType');
  const quantity = useField('services.quantity');
  const products = useSelector((s) => s.discovery.form.services.products);
  const showPrices = useField('services.showPrices');
  const hasPackages = useField('services.hasPackages');
  const packageDetails = useField('services.packageDetails');
  const hasOffers = useField('services.hasOffers');
  const offerDetails = useField('services.offerDetails');

  const itemNoun = offeringType === 'Services' ? 'service' : offeringType === 'Products' ? 'product' : 'offering';

  return (
    <div className="space-y-2">
      <Question
        number="Q1"
        label="What do you offer?"
        required
        error={errors['services.offeringType']}
      >
        <RadioGroup
          options={OFFERING_TYPES}
          value={offeringType}
          onChange={(v) => set('services.offeringType', v)}
        />
      </Question>

      <Question
        number="Q2"
        label={`Roughly how many ${itemNoun}s do you have?`}
        optional
      >
        <RadioGroup
          options={QUANTITIES}
          value={quantity}
          onChange={(v) => set('services.quantity', v)}
        />
      </Question>

      <Question
        number="Q3"
        label={`Your important ${itemNoun}s`}
        description="Add the ones that matter most. You can always add more later. Featured items get prominent placement on the site."
        optional
      >
        <DynamicList
          items={products}
          onAdd={() => dispatch(addProduct())}
          onRemove={(id) => dispatch(removeProduct(id))}
          renderItem={(p, i) => (
            <ProductRow
              product={p}
              onChange={(patch) => dispatch(updateProduct({ id: p.id, patch }))}
              itemNoun={itemNoun}
            />
          )}
          itemLabel={(i) => `${itemNoun.charAt(0).toUpperCase() + itemNoun.slice(1)} ${String(i + 1).padStart(2, '0')}`}
          addLabel={`Add another ${itemNoun}`}
          emptyLabel={`No ${itemNoun}s added yet — click below to start.`}
        />
      </Question>

      <Question
        number="Q4"
        label="Should prices appear on the website?"
        optional
      >
        <RadioGroup
          options={PRICE_OPTIONS}
          value={showPrices}
          onChange={(v) => set('services.showPrices', v)}
          columns={2}
        />
      </Question>

      <Question number="Q5" label="Do you offer packages?" optional>
        <RadioGroup
          options={YES_NO}
          value={hasPackages}
          onChange={(v) => set('services.hasPackages', v)}
        />
        <ConditionalReveal show={hasPackages === 'Yes'}>
          <TextArea
            value={packageDetails}
            onChange={(v) => set('services.packageDetails', v)}
            placeholder="Describe your packages — what's included, who they're for, roughly what they cost."
            rows={4}
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q6"
        label="Do you run special offers or discounts?"
        optional
      >
        <RadioGroup
          options={YES_NO_SOMETIMES}
          value={hasOffers}
          onChange={(v) => set('services.hasOffers', v)}
        />
        <ConditionalReveal show={hasOffers === 'Yes' || hasOffers === 'Sometimes'}>
          <TextArea
            value={offerDetails}
            onChange={(v) => set('services.offerDetails', v)}
            placeholder="Tell us about your typical offers — seasonal sales, referral bonuses, first-visit discounts, etc."
            rows={4}
          />
        </ConditionalReveal>
      </Question>
    </div>
  );
}

function ProductRow({ product, onChange, itemNoun }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-3">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
            Name
          </label>
          <TextInput
            value={product.name}
            onChange={(v) => onChange({ name: v })}
            placeholder={`e.g. Premium ${itemNoun} name`}
          />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
            Short description
          </label>
          <TextArea
            value={product.description}
            onChange={(v) => onChange({ description: v })}
            placeholder="One or two sentences that describe it."
            rows={2}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
              Price
            </label>
            <TextInput
              value={product.price}
              onChange={(v) => onChange({ price: v })}
              placeholder="e.g. $199 or from $50"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
              Feature this
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
              {product.featured ? '★ Featured' : 'Set as featured'}
            </button>
          </div>
        </div>
      </div>
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
          Image
        </label>
        <SingleUpload
          value={product.image}
          onChange={(v) => onChange({ image: v })}
          label="Upload photo"
          compact
        />
      </div>
    </div>
  );
}
