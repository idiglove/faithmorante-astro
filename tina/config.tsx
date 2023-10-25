// tina/config.{ts,js,tsx}
import { defineConfig } from "tinacms";

export default defineConfig({
  token: "498a48d88a876dd75fa9ae2565fd1f79240931cf", // generated on app.tina.io
  clientId: "3a123d43-5d27-473a-8481-8037ef08597d", // generated on app.tina.io
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  // See https://tina.io/docs/reference/schema/ for more information
  schema: {
    collections: [
      {
        label: "Blog Posts",
        name: "post",
        path: "content/posts",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
          },
          {
            type: "string",
            label: "Published at",
            name: "published_at",
          },
          {
            type: "rich-text",
            label: "Post Body",
            name: "body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
