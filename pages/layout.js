import PixelWar from "./page";

const metadata = {
  title: "PixelWar",
  description: "Generated by PixelWar",
};

const IndexPage = () => (
  <RootLayout metadata={metadata}>
    <PixelWar />
  </RootLayout>
);

export default IndexPage;