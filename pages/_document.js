import Document, { Html, Head, Main, NextScript } from "next/document";

// файл должен иметь именно такую структуру и используется он для расширения тегов html и body
// это необходимо, потому что страницы Next.js пропускают определенную разметку среды документа
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
