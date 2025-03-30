import { useEffect, useState } from "react";

const SmartShopping = () => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/SmartShopping.html") // Make sure the file is inside the "public" folder
      .then((res) => res.text())
      .then((data) => setHtml(data));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default SmartShopping;
