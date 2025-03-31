import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
const Dashbord = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/dashboard.html")
      .then((res) => res.text())
      .then((html) => setHtmlContent(html));
  }, []);

  return <>
  <Navbar></Navbar>
  <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  </>
};

export default Dashbord;
