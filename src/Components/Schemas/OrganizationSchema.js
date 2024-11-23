import React from "react";
import { OrganizationJsonLd } from "next-seo";

export default function OrganizationSchema() {
  return (
    <>
      <h1>Organization JSON-LD</h1>
      <OrganizationJsonLd
        type="Corporation"
        id="https://codesharer.xyz/#corporation"
        logo="https://codesharer.xyz/logo.png" // Replace with actual logo URL
        legalName="Md. Mainul Hasan"
        name="CodeSharer"
        url="https://codesharer.xyz"
        address={{
          addressLocality: "Dhaka",
          addressCountry: "Bangladesh",
        }}
        contactPoint={[
          {
            telephone: "+8801757995016",
            contactType: "customer service",
            areaServed: "Bangladesh",
            availableLanguage: ["English", "Bengali"],
          },
        ]}
        sameAs={[
          "https://www.facebook.com/mainul.hasanrifat.790",
          "https://github.com/Mainulhasan05",
          "https://www.linkedin.com/in/md-mainul-hasan-bb0833225/",
        ]}
      />
    </>
  );
}
