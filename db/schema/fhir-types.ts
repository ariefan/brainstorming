// ============================================================================
// FHIR R4 RESOURCE TYPES
// ============================================================================

/**
 * FHIR Patient resource type
 */
export interface FhirPatientResource {
  resourceType: "Patient";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  }[];
  active?: boolean;
  name?: {
    use?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
  }[];
  telecom?: {
    system?: string;
    value?: string;
    use?: string;
    rank?: number;
    period?: {
      start?: string;
      end?: string;
    };
  }[];
  gender?: "male" | "female" | "other" | "unknown";
  birthDate?: string;
  deceasedBoolean?: boolean;
  deceasedDateTime?: string;
  address?: {
    use?: string;
    type?: string;
    text?: string;
    line?: string[];
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    period?: {
      start?: string;
      end?: string;
    };
  }[];
  maritalStatus?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  multipleBirthBoolean?: boolean;
  multipleBirthInteger?: number;
  photo?: any[];
  contact?: {
    relationship?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    name?: {
      use?: string;
      family?: string;
      given?: string[];
      prefix?: string[];
      suffix?: string[];
    };
    telecom?: {
      system?: string;
      value?: string;
      use?: string;
      rank?: number;
      period?: {
        start?: string;
        end?: string;
      };
    }[];
    address?: {
      use?: string;
      type?: string;
      text?: string;
      line?: string[];
      city?: string;
      district?: string;
      state?: string;
      postalCode?: string;
      country?: string;
      period?: {
        start?: string;
        end?: string;
      };
    }[];
    gender?: "male" | "female" | "other" | "unknown";
    organization?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }[];
  communication?: {
    language?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    preferred?: boolean;
  }[];
  generalPractitioner?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  managingOrganization?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  link?: {
    other?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    type?: string;
  }[];
}

/**
 * FHIR Practitioner resource type
 */
export interface FhirPractitionerResource {
  resourceType: "Practitioner";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  }[];
  active?: boolean;
  name?: {
    use?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
  }[];
  telecom?: {
    system?: string;
    value?: string;
    use?: string;
    rank?: number;
    period?: {
      start?: string;
      end?: string;
    };
  }[];
  address?: {
    use?: string;
    type?: string;
    text?: string;
    line?: string[];
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    period?: {
      start?: string;
      end?: string;
    };
  }[];
  gender?: "male" | "female" | "other" | "unknown";
  birthDate?: string;
  photo?: any[];
  qualification?: {
    identifier?: {
      use?: string;
      type?: {
        coding?: {
          system?: string;
          version?: string;
          code?: string;
          display?: string;
          userSelected?: string;
        };
        text?: string;
      }[];
      system?: string;
      value?: string;
      period?: {
        start?: string;
        end?: string;
      };
      assigner?: {
        reference?: string;
        type?: string;
        identifier?: string;
        display?: string;
      }[];
    }[];
    code?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      }[];
      text?: string;
    }[];
    period?: {
      start?: string;
      end?: string;
    };
    issuer?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
  }[];
  communication?: {
    language?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    preferred?: boolean;
  }[];
}

/**
 * FHIR Location resource type
 */
export interface FhirLocationResource {
  resourceType: "Location";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  }[];
  status?: "active" | "suspended" | "inactive";
  operationalStatus?: {
    system?: string;
    code?: string;
    display?: string;
  };
  name?: string;
  alias?: string[];
  description?: string;
  mode?: "instance" | "kind";
  type?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  telecom?: {
    system?: string;
    value?: string;
    use?: string;
    rank?: number;
    period?: {
      start?: string;
      end?: string;
    };
  }[];
  address?: {
    use?: string;
    type?: string;
    text?: string;
    line?: string[];
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    period?: {
      start?: string;
      end?: string;
    };
  };
  physicalType?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  position?: {
    longitude?: number;
    latitude?: number;
    altitude?: number;
  };
  managingOrganization?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  partOf?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  hoursOfOperation?: {
    daysOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
    allDay?: boolean;
    openingTime?: string;
    closingTime?: string;
  }[];
  availabilityExceptions?: string;
  endpoint?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
}

/**
 * FHIR Encounter resource type
 */
export interface FhirEncounterResource {
  resourceType: "Encounter";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  }[];
  status?:
    | "planned"
    | "in-progress"
    | "onleave"
    | "finished"
    | "cancelled"
    | "entered-in-error"
    | "unknown";
  statusHistory?: {
    status?:
      | "planned"
      | "in-progress"
      | "onleave"
      | "finished"
      | "cancelled"
      | "entered-in-error"
      | "unknown";
    period?: {
      start?: string;
      end?: string;
    };
  }[];
  class?: {
    system?: string;
    code?: string;
    display?: string;
  };
  classHistory?: {
    class?: {
      system?: string;
      code?: string;
      display?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }[];
  type?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  serviceType?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  priority?: number;
  subject?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  episodeOfCare?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  basedOn?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  participant?: {
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    period?: {
      start?: string;
      end?: string;
    };
    individual?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
  }[];
  appointment?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  period?: {
    start?: string;
    end?: string;
  };
  length?: {
    value?: number;
    unit?: string;
    system?: string;
    code?: string;
  };
  reasonCode?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  diagnosis?: {
    condition?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    use?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    rank?: number;
  }[];
  account?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  hospitalization?: {
    preAdmissionIdentifier?: {
      use?: string;
      type?: {
        coding?: {
          system?: string;
          version?: string;
          code?: string;
          display?: string;
          userSelected?: string;
        };
        text?: string;
      }[];
      system?: string;
      value?: string;
      period?: {
        start?: string;
        end?: string;
      };
      assigner?: {
        reference?: string;
        type?: string;
        identifier?: string;
        display?: string;
      }[];
    };
    origin?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    admitSource?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    reAdmission?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    dietPreference?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    specialCourtesy?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    specialArrangement?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    destination?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    dischargeDisposition?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
  };
  location?: {
    location?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    status?: "planned" | "active" | "reserved" | "completed";
    physicalType?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }[];
  serviceProvider?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  partOf?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
}

/**
 * FHIR Condition resource type
 */
export interface FhirConditionResource {
  resourceType: "Condition";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  }[];
  clinicalStatus?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  verificationStatus?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  category?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  severity?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  code?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  bodySite?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  subject?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  onsetDateTime?: string;
  onsetAge?: {
    value?: number;
    unit?: string;
    system?: string;
    code?: string;
  };
  onsetPeriod?: {
    start?: string;
    end?: string;
  };
  onsetRange?: {
    low?: number;
    high?: number;
  };
  onsetString?: string;
  abatementDateTime?: string;
  abatementAge?: {
    value?: number;
    unit?: string;
    system?: string;
    code?: string;
  };
  abatementPeriod?: {
    start?: string;
    end?: string;
  };
  abatementRange?: {
    low?: number;
    high?: number;
  };
  abatementString?: string;
  recordedDate?: string;
  recorder?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  asserter?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  stage?: {
    summary?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    assessment?: {
      reference?: string;
      display?: string;
      identifier?: string;
    }[];
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
  }[];
  evidence?: {
    code?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    detail?: {
      reference?: string;
      display?: string;
      identifier?: string;
    }[];
  }[];
  note?: {
    authorReference?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    authorString?: string;
    time?: string;
    text?: string;
  }[];
}

/**
 * FHIR Observation resource type
 */
export interface FhirObservationResource {
  resourceType: "Observation";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  }[];
  basedOn?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  status?:
    | "registered"
    | "preliminary"
    | "final"
    | "amended"
    | "corrected"
    | "cancelled"
    | "entered-in-error"
    | "unknown";
  category?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  code?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  focus?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  encounter?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  effectiveDateTime?: string;
  effectivePeriod?: {
    start?: string;
    end?: string;
  };
  effectiveTiming?: {
    event?: string[];
    repeat?: {
      boundsPeriod?: {
        start?: string;
        end?: string;
      };
      count?: number;
      countMax?: number;
      duration?: number;
      durationMax?: number;
      durationUnit?: string;
      frequency?: number;
      frequencyMax?: number;
      period?: number;
      periodMax?: number;
      periodUnit?: string;
      dayOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
      timeOfDay?: string[];
      when?: string[];
    };
    code?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
  };
  issued?: string;
  performer?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  valueQuantity?: {
    value?: number;
    comparator?: "<" | "<=" | ">=" | ">" | "ad";
    unit?: string;
    system?: string;
    code?: string;
  };
  valueCodeableConcept?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueRange?: {
    low?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    high?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
  };
  valueRatio?: {
    numerator?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    denominator?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
  };
  valueSampledData?: {
    origin?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    period?: number;
    factor?: number;
    lowerLimit?: number;
    upperLimit?: number;
    dimensions?: number;
    data?: string;
  };
  valueTime?: string;
  valueDateTime?: string;
  valuePeriod?: {
    start?: string;
    end?: string;
  };
  dataAbsentReason?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  interpretation?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  note?: {
    authorReference?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    authorString?: string;
    time?: string;
    text?: string;
  }[];
  bodySite?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  method?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  specimen?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  device?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  referenceRange?: {
    low?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    high?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    appliesTo?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    age?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    text?: string;
  }[];
  hasMember?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  derivedFrom?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  component?: {
    code?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    valueQuantity?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    valueCodeableConcept?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    valueString?: string;
    valueBoolean?: boolean;
    valueInteger?: number;
    valueRange?: {
      low?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      high?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
    };
    valueRatio?: {
      numerator?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      denominator?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
    };
    valueSampledData?: {
      origin?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      period?: number;
      factor?: number;
      lowerLimit?: number;
      upperLimit?: number;
      dimensions?: number;
      data?: string;
    };
    valueTime?: string;
    valueDateTime?: string;
    valuePeriod?: {
      start?: string;
      end?: string;
    };
    dataAbsentReason?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    interpretation?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    referenceRange?: {
      low?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      high?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      type?: {
        coding?: {
          system?: string;
          version?: string;
          code?: string;
          display?: string;
          userSelected?: boolean;
        }[];
        text?: string;
      };
      appliesTo?: {
        coding?: {
          system?: string;
          version?: string;
          code?: string;
          display?: string;
          userSelected?: boolean;
        }[];
        text?: string;
      }[];
      age?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      text?: string;
    }[];
  }[];
}

/**
 * FHIR MedicationRequest resource type
 */
export interface FhirMedicationRequestResource {
  resourceType: "MedicationRequest";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  }[];
  status?:
    | "active"
    | "on-hold"
    | "cancelled"
    | "completed"
    | "entered-in-error"
    | "stopped"
    | "draft"
    | "unknown";
  statusReason?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  intent?:
    | "proposal"
    | "plan"
    | "order"
    | "original-order"
    | "reflex-order"
    | "filler-order"
    | "instance-order"
    | "option";
  category?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  priority?: "routine" | "urgent" | "asap" | "stat";
  doNotPerform?: boolean;
  reportedBoolean?: boolean;
  reportedReference?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  medicationCodeableConcept?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  medicationReference?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  supportingInformation?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  authoredOn?: string;
  requester?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  performerType?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  performer?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  recorder?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  reasonCode?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  reasonReference?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  note?: {
    authorReference?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    authorString?: string;
    time?: string;
    text?: string;
  }[];
  dosageInstruction?: {
    sequence?: number;
    text?: string;
    additionalInstruction?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    patientInstruction?: string;
    timing?: {
      event?: string[];
      repeat?: {
        boundsDuration?: {
          value?: number;
          unit?: string;
          system?: string;
          code?: string;
        };
        boundsRange?: {
          low?: {
            value?: number;
            comparator?: "<" | "<=" | ">=" | ">" | "ad";
            unit?: string;
            system?: string;
            code?: string;
          };
          high?: {
            value?: number;
            comparator?: "<" | "<=" | ">=" | ">" | "ad";
            unit?: string;
            system?: string;
            code?: string;
          };
        };
        boundsPeriod?: {
          start?: string;
          end?: string;
        };
        count?: number;
        countMax?: number;
        duration?: number;
        durationMax?: number;
        durationUnit?: string;
        frequency?: number;
        frequencyMax?: number;
        period?: number;
        periodMax?: number;
        periodUnit?: string;
        dayOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
        timeOfDay?: string[];
        when?: string[];
        offset?: number;
      };
      code?: {
        coding?: {
          system?: string;
          version?: string;
          code?: string;
          display?: string;
          userSelected?: boolean;
        }[];
        text?: string;
      };
    };
    asNeededBoolean?: boolean;
    asNeededCodeableConcept?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    site?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    route?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    method?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    doseAndRate?: {
      type?: {
        coding?: {
          system?: string;
          version?: string;
          code?: string;
          display?: string;
          userSelected?: boolean;
        }[];
        text?: string;
      };
      doseRange?: {
        low?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
        high?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
      };
      doseQuantity?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      rateRatio?: {
        numerator?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
        denominator?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
      };
      rateRange?: {
        low?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
        high?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
      };
      rateQuantity?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
    };
    maxDosePerPeriod?: {
      numerator?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      denominator?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
    };
    maxDosePerAdministration?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    maxDosePerLifetime?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
  }[];
  dispenseRequest?: {
    initialFill?: {
      quantity?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      duration?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
    };
    dispenseInterval?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    validityPeriod?: {
      start?: string;
      end?: string;
    };
    numberOfRepeatsAllowed?: number;
    quantity?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    expectedSupplyDuration?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    performer?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
  };
  substitution?: {
    allowedBoolean?: boolean;
    allowedCodeableConcept?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    reason?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
  };
  priorPrescription?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  detectedIssue?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  eventHistory?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
}

/**
 * FHIR MedicationDispense resource type
 */
export interface FhirMedicationDispenseResource {
  resourceType: "MedicationDispense";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  }[];
  status?:
    | "preparation"
    | "in-progress"
    | "cancelled"
    | "on-hold"
    | "completed"
    | "entered-in-error"
    | "stopped"
    | "declined"
    | "unknown";
  statusReasonCodeableConcept?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  statusReasonReference?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  category?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  medicationCodeableConcept?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  medicationReference?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  supportingInformation?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  performer?: {
    actor?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    onBehalfOf?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
  }[];
  location?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  authorizingPrescription?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  type?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  quantity?: {
    value?: number;
    comparator?: "<" | "<=" | ">=" | ">" | "ad";
    unit?: string;
    system?: string;
    code?: string;
  };
  daysSupply?: {
    value?: number;
    comparator?: "<" | "<=" | ">=" | ">" | "ad";
    unit?: string;
    system?: string;
    code?: string;
  };
  whenPrepared?: string;
  whenHandedOver?: string;
  destination?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  receiver?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  note?: {
    authorReference?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    authorString?: string;
    time?: string;
    text?: string;
  }[];
  dosageInstruction?: {
    sequence?: number;
    text?: string;
    additionalInstruction?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    patientInstruction?: string;
    timing?: {
      event?: string[];
      repeat?: {
        boundsDuration?: {
          value?: number;
          unit?: string;
          system?: string;
          code?: string;
        };
        boundsRange?: {
          low?: {
            value?: number;
            comparator?: "<" | "<=" | ">=" | ">" | "ad";
            unit?: string;
            system?: string;
            code?: string;
          };
          high?: {
            value?: number;
            comparator?: "<" | "<=" | ">=" | ">" | "ad";
            unit?: string;
            system?: string;
            code?: string;
          };
        };
        boundsPeriod?: {
          start?: string;
          end?: string;
        };
        count?: number;
        countMax?: number;
        duration?: number;
        durationMax?: number;
        durationUnit?: string;
        frequency?: number;
        frequencyMax?: number;
        period?: number;
        periodMax?: number;
        periodUnit?: string;
        dayOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
        timeOfDay?: string[];
        when?: string[];
        offset?: number;
      };
      code?: {
        coding?: {
          system?: string;
          version?: string;
          code?: string;
          display?: string;
          userSelected?: boolean;
        }[];
        text?: string;
      };
    };
    asNeededBoolean?: boolean;
    asNeededCodeableConcept?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    site?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    route?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    method?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    doseAndRate?: {
      type?: {
        coding?: {
          system?: string;
          version?: string;
          code?: string;
          display?: string;
          userSelected?: boolean;
        }[];
        text?: string;
      };
      doseRange?: {
        low?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
        high?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
      };
      doseQuantity?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      rateRatio?: {
        numerator?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
        denominator?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
      };
      rateRange?: {
        low?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
        high?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
      };
      rateQuantity?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
    };
    maxDosePerPeriod?: {
      numerator?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      denominator?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
    };
    maxDosePerAdministration?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    maxDosePerLifetime?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
  }[];
  substitution?: {
    wasSubstituted?: boolean;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    reason?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    }[];
    responsibleParty?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
  };
  detectedIssue?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  eventHistory?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
}

/**
 * FHIR ServiceRequest resource type
 */
export interface FhirServiceRequestResource {
  resourceType: "ServiceRequest";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  }[];
  instantiatesCanonical?: string[];
  instantiatesReference?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  basedOn?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  replaces?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  requisition?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  };
  status?:
    | "draft"
    | "active"
    | "on-hold"
    | "revoked"
    | "completed"
    | "entered-in-error"
    | "unknown";
  intent?:
    | "proposal"
    | "plan"
    | "directive"
    | "order"
    | "original-order"
    | "reflex-order"
    | "filler-order"
    | "instance-order"
    | "option";
  category?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  priority?: "routine" | "urgent" | "asap" | "stat";
  doNotPerform?: boolean;
  code?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  orderDetail?: {
    parameter?: {
      code?: {
        coding?: {
          system?: string;
          version?: string;
          code?: string;
          display?: string;
          userSelected?: boolean;
        }[];
        text?: string;
      };
      valueQuantity?: {
        value?: number;
        comparator?: "<" | "<=" | ">=" | ">" | "ad";
        unit?: string;
        system?: string;
        code?: string;
      };
      valueRatio?: {
        numerator?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
        denominator?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
      };
      valueRange?: {
        low?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
        high?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
      };
      valueReference?: {
        reference?: string;
        display?: string;
        identifier?: string;
      };
    }[];
  }[];
  quantityQuantity?: {
    value?: number;
    comparator?: "<" | "<=" | ">=" | ">" | "ad";
    unit?: string;
    system?: string;
    code?: string;
  };
  quantityRatio?: {
    numerator?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    denominator?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
  };
  quantityRange?: {
    low?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
    high?: {
      value?: number;
      comparator?: "<" | "<=" | ">=" | ">" | "ad";
      unit?: string;
      system?: string;
      code?: string;
    };
  };
  subject?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  occurrenceDateTime?: string;
  occurrencePeriod?: {
    start?: string;
    end?: string;
  };
  occurrenceTiming?: {
    event?: string[];
    repeat?: {
      boundsDuration?: {
        value?: number;
        unit?: string;
        system?: string;
        code?: string;
      };
      boundsRange?: {
        low?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
        high?: {
          value?: number;
          comparator?: "<" | "<=" | ">=" | ">" | "ad";
          unit?: string;
          system?: string;
          code?: string;
        };
      };
      boundsPeriod?: {
        start?: string;
        end?: string;
      };
      count?: number;
      countMax?: number;
      duration?: number;
      durationMax?: number;
      durationUnit?: string;
      frequency?: number;
      frequencyMax?: number;
      period?: number;
      periodMax?: number;
      periodUnit?: string;
      dayOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
      timeOfDay?: string[];
      when?: string[];
      offset?: number;
    };
    code?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
  };
  asNeededBoolean?: boolean;
  asNeededCodeableConcept?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  authoredOn?: string;
  requester?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  performerType?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  performer?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  locationCode?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  locationReference?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  reasonCode?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  reasonReference?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  insurance?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  supportingInfo?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  specimen?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  bodySite?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  bodyStructure?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  note?: {
    authorReference?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    authorString?: string;
    time?: string;
    text?: string;
  }[];
  patientInstruction?: string;
  relevantHistory?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
}

/**
 * FHIR DiagnosticReport resource type
 */
export interface FhirDiagnosticReportResource {
  resourceType: "DiagnosticReport";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  }[];
  basedOn?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  status?:
    | "registered"
    | "partial"
    | "preliminary"
    | "final"
    | "amended"
    | "corrected"
    | "appended"
    | "cancelled"
    | "entered-in-error"
    | "unknown";
  category?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  code?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  effectiveDateTime?: string;
  effectivePeriod?: {
    start?: string;
    end?: string;
  };
  issued?: string;
  performer?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  resultsInterpreter?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  specimen?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  result?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  imagingStudy?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  media?: {
    comment?: string;
    link?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
  }[];
  conclusion?: string;
  conclusionCode?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  presentedForm?: {
    contentType?: string;
    language?: string;
    data?: string;
    url?: string;
    size?: number;
    hash?: string;
    title?: string;
    creation?: string;
  }[];
  note?: {
    authorReference?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    authorString?: string;
    time?: string;
    text?: string;
  }[];
}

/**
 * FHIR Composition resource type
 */
export interface FhirCompositionResource {
  resourceType: "Composition";
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: string[];
    tags?: {
      system?: string;
      code?: string;
      display?: string;
    }[];
  };
  implicitRules?: string[];
  language?: string;
  text?: {
    status: string;
    div?: string;
  };
  contained?: any[];
  extension?: any[];
  modifierExtension?: any[];
  identifier?: {
    use?: string;
    type?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: string;
      };
      text?: string;
    }[];
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      reference?: string;
      type?: string;
      identifier?: string;
      display?: string;
    }[];
  };
  status?: "preliminary" | "final" | "amended" | "entered-in-error";
  type?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  };
  category?: {
    coding?: {
      system?: string;
      version?: string;
      code?: string;
      display?: string;
      userSelected?: boolean;
    }[];
    text?: string;
  }[];
  subject?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  date?: string;
  author?: {
    reference?: string;
    display?: string;
    identifier?: string;
  }[];
  title?: string;
  confidentiality?: "U" | "L" | "M" | "N" | "R" | "V";
  attester?: {
    mode?: "personal" | "professional" | "legal" | "official";
    time?: string;
    party?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
  }[];
  custodian?: {
    reference?: string;
    display?: string;
    identifier?: string;
  };
  relatesTo?: {
    code?:
      | "replaces"
      | "amends"
      | "appends"
      | "transforms"
      | "replaces"
      | "signs"
      | "appends";
    targetIdentifier?: {
      use?: string;
      type?: {
        coding?: {
          system?: string;
          version?: string;
          code?: string;
          display?: string;
          userSelected?: string;
        };
        text?: string;
      }[];
      system?: string;
      value?: string;
      period?: {
        start?: string;
        end?: string;
      };
      assigner?: {
        reference?: string;
        type?: string;
        identifier?: string;
        display?: string;
      }[];
    };
    targetReference?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
  }[];
  event?: {
    code?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
    detail?: {
      reference?: string;
      display?: string;
      identifier?: string;
    }[];
  };
  section?: {
    title?: string;
    code?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    author?: {
      reference?: string;
      display?: string;
      identifier?: string;
    }[];
    focus?: {
      reference?: string;
      display?: string;
      identifier?: string;
    };
    text?: {
      status: string;
      div?: string;
    };
    mode?: "working" | "snapshot" | "changes";
    orderedBy?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    entry?: {
      reference?: string;
      display?: string;
      identifier?: string;
    }[];
    emptyReason?: {
      coding?: {
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
      }[];
      text?: string;
    };
    section?: any[];
  }[];
}

/**
 * Union type for all FHIR resources
 */
export type FhirResource =
  | FhirPatientResource
  | FhirPractitionerResource
  | FhirLocationResource
  | FhirEncounterResource
  | FhirConditionResource
  | FhirObservationResource
  | FhirMedicationRequestResource
  | FhirMedicationDispenseResource
  | FhirServiceRequestResource
  | FhirDiagnosticReportResource
  | FhirCompositionResource;
