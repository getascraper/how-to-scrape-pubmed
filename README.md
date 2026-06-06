# How to Scrape PubMed Papers in Node.js

Extract PubMed biomedical research into RAG-ready JSON using the [PubMed Scraper for RAG](https://apify.com/devanshlive/pubmed-rag-extractor) actor on Apify -- no browser automation or proxies required.

## What this example does

- Calls the PubMed Scraper for RAG actor via the Apify client
- Passes search term, optional MeSH terms, article types, and date range
- Waits for the run to complete
- Fetches results from the actor's dataset
- Prints each paper to the console

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An [Apify account](https://console.apify.com/sign-up) (free tier available)
- An [Apify API token](https://console.apify.com/settings/integrations)

## Installation

```bash
npm install
```

## Environment setup

```bash
cp .env.example .env
```

Open `.env` and replace `your_apify_token_here` with your actual Apify API token.

## Usage

```bash
npm start
```

## Code example

```javascript
import { ApifyClient } from 'apify-client';
import 'dotenv/config';

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

const input = {
  searchTerm: 'SARS-CoV-2 vaccines',
  articleTypes: ['review', 'meta_analysis'],
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  maxPapers: 10,
};

const run = await client.actor('devanshlive/pubmed-rag-extractor').call(input);

console.log('Results from dataset');
console.log(`Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
  console.dir(item);
});
```

## Example output

See `sample-output.json` for a full example. Each paper includes:

| Field | Description |
|-------|-------------|
| `pmid` | PubMed ID (primary identifier) |
| `pmcid` | PubMed Central ID (present for PMC OA papers) |
| `doi` | DOI (when provided by PubMed) |
| `title` | Paper title |
| `abstract` | Abstract as returned by E-utilities |
| `authors` | Author display names, order preserved |
| `journal` | Journal title |
| `mesh_terms` | MeSH Descriptor headings assigned by NLM |
| `article_types` | PubMed publication types |
| `publication_date` | YYYY-MM-DD |
| `pubmed_url` | Link to the PubMed citation |
| `pdf_url` | PMC PDF link, when available |
| `source` | `full_text` or `abstract` (text origin) |
| `chunks` | Token-aware chunks for RAG |
| `chunks[].idx` | 0-indexed position |
| `chunks[].text` | Chunk text |
| `chunks[].tokens` | Token count (≤ 512) |

## Use cases

- **Biomedical research:** Build RAG corpora from PubMed without XML parsing
- **Clinical evidence:** Extract systematic reviews and meta-analyses for evidence synthesis
- **Pharma intelligence:** Monitor drug-related publications for competitive analysis
- **Embedding pipelines:** Feed pre-chunked text into vector databases for biomedical Q&A

## Try the actor on Apify

[Open the PubMed Scraper for RAG on Apify](https://apify.com/devanshlive/pubmed-rag-extractor)

## Related resources

- [PubMed E-utilities documentation](https://www.ncbi.nlm.nih.gov/books/NBK25501/)
- [Apify Client for JavaScript](https://docs.apify.com/api/client/js/)

## License

MIT
