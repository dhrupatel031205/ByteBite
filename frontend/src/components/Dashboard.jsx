import React, { useEffect, useState } from "react";

const Dashbord = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/dashboard.html")
      .then((res) => res.text())
      .then((html) => setHtmlContent(html));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default Dashbord;
