import { useSelector } from 'react-redux';
import { Panel, LocalizedText, LocalizedArea, TextField, Segmented, ListEditor, useBind, useItemUpdater } from '../fields.jsx';

export default function JournalEditor() {
  const journal = useSelector((s) => s.content.journal);
  const bind = useBind('journal');
  const setItem = useItemUpdater('journal.items');

  return (
    <>
      <Panel title="Journal — header">
        <LocalizedText label="Heading" value={journal.heading} onChange={(v) => bind.set('heading', v)} hint='use "||" for line breaks' />
        <Segmented
          label="Accent line"
          value={journal.accentLine ?? -1}
          onChange={(v) => bind.set('accentLine', v)}
          options={[{ value: -1, label: 'None' }, { value: 0, label: 'L1' }, { value: 1, label: 'L2' }]}
        />
      </Panel>

      <Panel title="Articles" description="Star one article to feature it in the large slot.">
        <ListEditor
          path="journal.items"
          items={journal.items}
          allowFeatured
          itemLabel={(i) => journal.items[i]?.title?.en || `Article ${i + 1}`}
          makeEmpty={() => ({
            id: `art-${Date.now()}`,
            featured: false,
            category: { en: 'Category', ar: '' },
            title: { en: 'Title', ar: '' },
            excerpt: { en: '', ar: '' },
            author: { en: '', ar: '' },
            date: { en: '', ar: '' },
            read: { en: '', ar: '' },
          })}
          renderItem={(item, i) => (
            <>
              <TextField label="ID" value={item.id} onChange={(v) => setItem(i, 'id', v)} />
              <LocalizedText label="Category" value={item.category} onChange={(v) => setItem(i, 'category', v)} />
              <LocalizedText label="Title" value={item.title} onChange={(v) => setItem(i, 'title', v)} />
              <LocalizedArea label="Excerpt" value={item.excerpt} onChange={(v) => setItem(i, 'excerpt', v)} rows={3} />
              <LocalizedText label="Author" value={item.author} onChange={(v) => setItem(i, 'author', v)} />
              <LocalizedText label="Date" value={item.date} onChange={(v) => setItem(i, 'date', v)} />
              <LocalizedText label="Reading time" value={item.read} onChange={(v) => setItem(i, 'read', v)} />
            </>
          )}
        />
      </Panel>
    </>
  );
}
