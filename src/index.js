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
