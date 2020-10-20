import React from 'react';

import Layout from 'components/layout';
import Grid, { GridItem } from 'components/grid';
import DocumentItem from 'components/items/document-item';
import { simplyFetchFromGraph } from 'lib/graph';
import fragments from 'lib/graph/fragments';
import { useT } from 'lib/i18n';

import { Outer, Hero } from './styles';
import { H1 } from 'ui';


export async function getData({ language, preview = null }) {
  try {
    const { data } = await simplyFetchFromGraph({
      query: `
        query FRONTPAGE($language: String!, $path: String!,  $version: VersionLabel!) {
          catalogue(path: $path, language: $language, version: $version) {
            ...item
            ...product
          }
        }

        ${fragments}
      `,
      variables: {
        language,
        path: '/web-frontpage',
        version: preview ? 'draft' : 'published'
      }
    });
    return { ...data, preview };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function FrontPage({ catalogue, preview }) {
  const t = useT();
  const [item] =
    catalogue?.components?.find((c) => c.type === 'itemRelations')?.content
      ?.items || [];
  const [grid] =
    catalogue?.components?.find((c) => c.type === 'gridRelations')?.content
      ?.grids || [];

  return (
    <Layout title={t('frontpage.title')} preview={preview}>
      <Hero>
        <DocumentItem data={item} colSpan="1" />
      </Hero>
      <Outer>
        {grid && (
          <Grid
            model={grid}
            cellComponent={({ cell }) => (
              <GridItem data={cell.item} gridCell={cell} />
            )}
          />
        )}
      </Outer>
    </Layout>
  );
}
