import type { NextPage } from "next";
import Image from "next/image";

export const test: string = "test";

export interface ITest {}

const Home: NextPage = () => {
  function fn(s: Array<any>): string {
    // No error?
    console.log(s);

    return "";
  }

  return (
    <div>
      <div className="parent">
        <div className="child">
          <Image
            width={640}
            height={480}
            //loader={({ src, width }) => src + "&width=" + width}
            src={"/static/foto.jpg"}
            //layout="responsive"
            priority
            objectFit="cover"
            onLoad={(e) => console.log("loaded", e)}
            onError={(e) => console.log("error", e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
