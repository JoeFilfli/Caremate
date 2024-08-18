/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createRequest } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function RequestCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    title: "",
    description: "",
    date: "",
    location: "",
    seniorID: "",
    volunteerID: "",
    status: "",
    country: "",
    locale: "",
    seniorFeedback: "",
    volunteerFeedback: "",
    createdAt: "",
    updatedAt: "",
    picture: "",
    pictures: [],
    rate: "",
    volunteerName: "",
    urgent: false,
    tags: [],
    compensations: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [date, setDate] = React.useState(initialValues.date);
  const [location, setLocation] = React.useState(initialValues.location);
  const [seniorID, setSeniorID] = React.useState(initialValues.seniorID);
  const [volunteerID, setVolunteerID] = React.useState(
    initialValues.volunteerID
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [country, setCountry] = React.useState(initialValues.country);
  const [locale, setLocale] = React.useState(initialValues.locale);
  const [seniorFeedback, setSeniorFeedback] = React.useState(
    initialValues.seniorFeedback
  );
  const [volunteerFeedback, setVolunteerFeedback] = React.useState(
    initialValues.volunteerFeedback
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [picture, setPicture] = React.useState(initialValues.picture);
  const [pictures, setPictures] = React.useState(initialValues.pictures);
  const [rate, setRate] = React.useState(initialValues.rate);
  const [volunteerName, setVolunteerName] = React.useState(
    initialValues.volunteerName
  );
  const [urgent, setUrgent] = React.useState(initialValues.urgent);
  const [tags, setTags] = React.useState(initialValues.tags);
  const [compensations, setCompensations] = React.useState(
    initialValues.compensations
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setDate(initialValues.date);
    setLocation(initialValues.location);
    setSeniorID(initialValues.seniorID);
    setVolunteerID(initialValues.volunteerID);
    setStatus(initialValues.status);
    setCountry(initialValues.country);
    setLocale(initialValues.locale);
    setSeniorFeedback(initialValues.seniorFeedback);
    setVolunteerFeedback(initialValues.volunteerFeedback);
    setCreatedAt(initialValues.createdAt);
    setUpdatedAt(initialValues.updatedAt);
    setPicture(initialValues.picture);
    setPictures(initialValues.pictures);
    setCurrentPicturesValue("");
    setRate(initialValues.rate);
    setVolunteerName(initialValues.volunteerName);
    setUrgent(initialValues.urgent);
    setTags(initialValues.tags);
    setCurrentTagsValue("");
    setCompensations(initialValues.compensations);
    setErrors({});
  };
  const [currentPicturesValue, setCurrentPicturesValue] = React.useState("");
  const picturesRef = React.createRef();
  const [currentTagsValue, setCurrentTagsValue] = React.useState("");
  const tagsRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    date: [{ type: "Required" }],
    location: [],
    seniorID: [{ type: "Required" }],
    volunteerID: [],
    status: [{ type: "Required" }],
    country: [],
    locale: [],
    seniorFeedback: [],
    volunteerFeedback: [],
    createdAt: [{ type: "Required" }],
    updatedAt: [],
    picture: [],
    pictures: [],
    rate: [],
    volunteerName: [],
    urgent: [],
    tags: [],
    compensations: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          title,
          description,
          date,
          location,
          seniorID,
          volunteerID,
          status,
          country,
          locale,
          seniorFeedback,
          volunteerFeedback,
          createdAt,
          updatedAt,
          picture,
          pictures,
          rate,
          volunteerName,
          urgent,
          tags,
          compensations,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createRequest.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "RequestCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title: value,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description: value,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={date && convertToLocal(new Date(date))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date: value,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location: value,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Senior id"
        isRequired={true}
        isReadOnly={false}
        value={seniorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID: value,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.seniorID ?? value;
          }
          if (errors.seniorID?.hasError) {
            runValidationTasks("seniorID", value);
          }
          setSeniorID(value);
        }}
        onBlur={() => runValidationTasks("seniorID", seniorID)}
        errorMessage={errors.seniorID?.errorMessage}
        hasError={errors.seniorID?.hasError}
        {...getOverrideProps(overrides, "seniorID")}
      ></TextField>
      <TextField
        label="Volunteer id"
        isRequired={false}
        isReadOnly={false}
        value={volunteerID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID: value,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.volunteerID ?? value;
          }
          if (errors.volunteerID?.hasError) {
            runValidationTasks("volunteerID", value);
          }
          setVolunteerID(value);
        }}
        onBlur={() => runValidationTasks("volunteerID", volunteerID)}
        errorMessage={errors.volunteerID?.errorMessage}
        hasError={errors.volunteerID?.hasError}
        {...getOverrideProps(overrides, "volunteerID")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={true}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status: value,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Country"
        isRequired={false}
        isReadOnly={false}
        value={country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country: value,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.country ?? value;
          }
          if (errors.country?.hasError) {
            runValidationTasks("country", value);
          }
          setCountry(value);
        }}
        onBlur={() => runValidationTasks("country", country)}
        errorMessage={errors.country?.errorMessage}
        hasError={errors.country?.hasError}
        {...getOverrideProps(overrides, "country")}
      ></TextField>
      <TextField
        label="Locale"
        isRequired={false}
        isReadOnly={false}
        value={locale}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale: value,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.locale ?? value;
          }
          if (errors.locale?.hasError) {
            runValidationTasks("locale", value);
          }
          setLocale(value);
        }}
        onBlur={() => runValidationTasks("locale", locale)}
        errorMessage={errors.locale?.errorMessage}
        hasError={errors.locale?.hasError}
        {...getOverrideProps(overrides, "locale")}
      ></TextField>
      <TextField
        label="Senior feedback"
        isRequired={false}
        isReadOnly={false}
        value={seniorFeedback}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback: value,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.seniorFeedback ?? value;
          }
          if (errors.seniorFeedback?.hasError) {
            runValidationTasks("seniorFeedback", value);
          }
          setSeniorFeedback(value);
        }}
        onBlur={() => runValidationTasks("seniorFeedback", seniorFeedback)}
        errorMessage={errors.seniorFeedback?.errorMessage}
        hasError={errors.seniorFeedback?.hasError}
        {...getOverrideProps(overrides, "seniorFeedback")}
      ></TextField>
      <TextField
        label="Volunteer feedback"
        isRequired={false}
        isReadOnly={false}
        value={volunteerFeedback}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback: value,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.volunteerFeedback ?? value;
          }
          if (errors.volunteerFeedback?.hasError) {
            runValidationTasks("volunteerFeedback", value);
          }
          setVolunteerFeedback(value);
        }}
        onBlur={() =>
          runValidationTasks("volunteerFeedback", volunteerFeedback)
        }
        errorMessage={errors.volunteerFeedback?.errorMessage}
        hasError={errors.volunteerFeedback?.hasError}
        {...getOverrideProps(overrides, "volunteerFeedback")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt: value,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Updated at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={updatedAt && convertToLocal(new Date(updatedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt: value,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.updatedAt ?? value;
          }
          if (errors.updatedAt?.hasError) {
            runValidationTasks("updatedAt", value);
          }
          setUpdatedAt(value);
        }}
        onBlur={() => runValidationTasks("updatedAt", updatedAt)}
        errorMessage={errors.updatedAt?.errorMessage}
        hasError={errors.updatedAt?.hasError}
        {...getOverrideProps(overrides, "updatedAt")}
      ></TextField>
      <TextField
        label="Picture"
        isRequired={false}
        isReadOnly={false}
        value={picture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture: value,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.picture ?? value;
          }
          if (errors.picture?.hasError) {
            runValidationTasks("picture", value);
          }
          setPicture(value);
        }}
        onBlur={() => runValidationTasks("picture", picture)}
        errorMessage={errors.picture?.errorMessage}
        hasError={errors.picture?.hasError}
        {...getOverrideProps(overrides, "picture")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures: values,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            values = result?.pictures ?? values;
          }
          setPictures(values);
          setCurrentPicturesValue("");
        }}
        currentFieldValue={currentPicturesValue}
        label={"Pictures"}
        items={pictures}
        hasError={errors?.pictures?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("pictures", currentPicturesValue)
        }
        errorMessage={errors?.pictures?.errorMessage}
        setFieldValue={setCurrentPicturesValue}
        inputFieldRef={picturesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pictures"
          isRequired={false}
          isReadOnly={false}
          value={currentPicturesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.pictures?.hasError) {
              runValidationTasks("pictures", value);
            }
            setCurrentPicturesValue(value);
          }}
          onBlur={() => runValidationTasks("pictures", currentPicturesValue)}
          errorMessage={errors.pictures?.errorMessage}
          hasError={errors.pictures?.hasError}
          ref={picturesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "pictures")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Rate"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={rate}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate: value,
              volunteerName,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.rate ?? value;
          }
          if (errors.rate?.hasError) {
            runValidationTasks("rate", value);
          }
          setRate(value);
        }}
        onBlur={() => runValidationTasks("rate", rate)}
        errorMessage={errors.rate?.errorMessage}
        hasError={errors.rate?.hasError}
        {...getOverrideProps(overrides, "rate")}
      ></TextField>
      <TextField
        label="Volunteer name"
        isRequired={false}
        isReadOnly={false}
        value={volunteerName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName: value,
              urgent,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.volunteerName ?? value;
          }
          if (errors.volunteerName?.hasError) {
            runValidationTasks("volunteerName", value);
          }
          setVolunteerName(value);
        }}
        onBlur={() => runValidationTasks("volunteerName", volunteerName)}
        errorMessage={errors.volunteerName?.errorMessage}
        hasError={errors.volunteerName?.hasError}
        {...getOverrideProps(overrides, "volunteerName")}
      ></TextField>
      <SwitchField
        label="Urgent"
        defaultChecked={false}
        isDisabled={false}
        isChecked={urgent}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent: value,
              tags,
              compensations,
            };
            const result = onChange(modelFields);
            value = result?.urgent ?? value;
          }
          if (errors.urgent?.hasError) {
            runValidationTasks("urgent", value);
          }
          setUrgent(value);
        }}
        onBlur={() => runValidationTasks("urgent", urgent)}
        errorMessage={errors.urgent?.errorMessage}
        hasError={errors.urgent?.hasError}
        {...getOverrideProps(overrides, "urgent")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags: values,
              compensations,
            };
            const result = onChange(modelFields);
            values = result?.tags ?? values;
          }
          setTags(values);
          setCurrentTagsValue("");
        }}
        currentFieldValue={currentTagsValue}
        label={"Tags"}
        items={tags}
        hasError={errors?.tags?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("tags", currentTagsValue)
        }
        errorMessage={errors?.tags?.errorMessage}
        setFieldValue={setCurrentTagsValue}
        inputFieldRef={tagsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Tags"
          isRequired={false}
          isReadOnly={false}
          value={currentTagsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tags?.hasError) {
              runValidationTasks("tags", value);
            }
            setCurrentTagsValue(value);
          }}
          onBlur={() => runValidationTasks("tags", currentTagsValue)}
          errorMessage={errors.tags?.errorMessage}
          hasError={errors.tags?.hasError}
          ref={tagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "tags")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Compensations"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={compensations}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              title,
              description,
              date,
              location,
              seniorID,
              volunteerID,
              status,
              country,
              locale,
              seniorFeedback,
              volunteerFeedback,
              createdAt,
              updatedAt,
              picture,
              pictures,
              rate,
              volunteerName,
              urgent,
              tags,
              compensations: value,
            };
            const result = onChange(modelFields);
            value = result?.compensations ?? value;
          }
          if (errors.compensations?.hasError) {
            runValidationTasks("compensations", value);
          }
          setCompensations(value);
        }}
        onBlur={() => runValidationTasks("compensations", compensations)}
        errorMessage={errors.compensations?.errorMessage}
        hasError={errors.compensations?.hasError}
        {...getOverrideProps(overrides, "compensations")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
