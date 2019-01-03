import Document, { Head, Main, NextScript } from 'next/document'

import styles from '../styles/index.css'

class Doc extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Airtable Timeline</title>
          <style jsx global>
            {styles}
          </style>
        </Head>
        <body className="body">
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Doc
