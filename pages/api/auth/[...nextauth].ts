import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
let prisma;
// ローカルでは大量にデータベースコネクションを張ってしまうことがあるので、
// このようなアプローチをとる。TypeScript が global type に prisma がないと怒るので、
// ルートディレクトリに global.d.ts を作成し、
// export {};
// declare global {
//   namespace NodeJS {
//     interface Global {
//       prisma: any;
//     }
//   }
// }

// としてあげれば治る
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    //　プロバイダーは何個でも指定できる。
    // https://next-auth.js.org/getting-started/introduction で一覧がみれる
    // 例：
    // Providers.Twitter({
    //   clientId: process.env.TWITTER_CLIENT_ID,
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET,
    // }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
};

export default (req, res) => NextAuth(req, res, options);