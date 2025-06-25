import React from "react";
import Header from "../../components/Header";
import PageLayout from "../../components/PageLayout";
import Hero from "../../modules/Home/Hero";
import Products from "../../modules/Home/Products";

const Home = () => {
  const [darkMode, setDarkMode] = React.useState(true);
  return (
    <PageLayout darkMode={darkMode}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Products />
    </PageLayout>
  );
};

export default Home;
