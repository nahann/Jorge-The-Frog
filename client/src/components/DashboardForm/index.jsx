import React from "react";
import { Button, Input } from "@chakra-ui/react";
import { Formik } from "formik";

export function DashboardForm({
  history,
  guildId,
  user,
  config,
  updatePrefix,
}) {
  const [prefix, setPrefix] = React.useState(config.prefix)

  return (
    <Formik initialValues={{ prefix: config.prefix }}>
      {(props) => (
        <form
          onSubmit={(value) => {
            updatePrefix(prefix);
          }}
        >
          <Input
            type="text"
            name="prefix"
            onChange={(value)=>setPrefix(value.target.value)}
            defaultValue={config.prefix}
          />
          <Button type="submit" colorScheme="orange" children="Update Prefix"  />
        </form>
      )}
    </Formik>
  );
}
