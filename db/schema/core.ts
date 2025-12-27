import {
  pgEnum,
  pgTable,
  uuid,
  timestamp,
  text,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

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

// ============================================================================
// BSON RESOURCE STORAGE TYPE
// ============================================================================

/**
 * BSON resource storage type for all tables
 * Stores both FHIR resources and custom BSON data
 */
export interface BsonResource {
  version?: number;
  fhirResource?: FhirResource;
  bsonData?: Record<string, any>;
  metadata?: Record<string, any>;
}

// ============================================================================
// ENUMS
// ============================================================================

// Organization Enums
export const orgTypeEnum = pgEnum("org_type", [
  "clinic",
  "hospital",
  "polyclinic",
  "pharmacy",
  "laboratory",
]);
export const subscriptionPlanEnum = pgEnum("subscription_plan", [
  "basic",
  "standard",
  "premium",
  "enterprise",
]);

// User Enums
export const roleEnum = pgEnum("role", [
  "owner",
  "admin",
  "doctor",
  "nurse",
  "midwife",
  "pharmacist",
  "lab_tech",
  "front_desk",
  "cashier",
]);
export const genderEnum = pgEnum("gender", ["male", "female", "other"]);
export const userStatusEnum = pgEnum("user_status", [
  "active",
  "inactive",
  "suspended",
  "pending_verification",
]);

// Patient Enums
export const maritalStatusEnum = pgEnum("marital_status", [
  "single",
  "married",
  "divorced",
  "widowed",
]);
export const bloodTypeEnum = pgEnum("blood_type", ["a", "b", "ab", "o"]);
export const rhesusEnum = pgEnum("rhesus", ["positive", "negative"]);
export const patientStatusEnum = pgEnum("patient_status", [
  "active",
  "inactive",
  "deceased",
]);

// Allergy Enums
export const allergySeverityEnum = pgEnum("allergy_severity", [
  "mild",
  "moderate",
  "severe",
  "life_threatening",
]);
export const allergyTypeEnum = pgEnum("allergy_type", [
  "food",
  "medication",
  "environmental",
  "other",
]);

// Polyclinic Enums
export const polyclinicTypeEnum = pgEnum("polyclinic_type", [
  "general",
  "dental",
  "kia",
  "specialist",
  "emergency",
  "lab",
  "pharmacy",
]);
export const dayOfWeekEnum = pgEnum("day_of_week", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

// Practitioner Enums
export const practitionerTypeEnum = pgEnum("practitioner_type", [
  "doctor",
  "nurse",
  "midwife",
  "pharmacist",
  "lab_tech",
  "radiologist",
  "specialist",
]);
export const specialtyEnum = pgEnum("specialty", [
  "general_practice",
  "internal_medicine",
  "pediatrics",
  "obgyn",
  "surgery",
  "dentistry",
  "ophthalmology",
  "dermatology",
  "psychiatry",
  "radiology",
  "pathology",
  "other",
]);

// Appointment Enums
export const appointmentStatusEnum = pgEnum("appointment_status", [
  "booked",
  "confirmed",
  "checked_in",
  "in_queue",
  "completed",
  "cancelled",
  "no_show",
]);
export const appointmentTypeEnum = pgEnum("appointment_type", [
  "consultation",
  "follow_up",
  "procedure",
  "lab",
  "imaging",
  "vaccination",
  "checkup",
]);

// Queue Enums
export const queueStatusEnum = pgEnum("queue_status", [
  "waiting",
  "called",
  "serving",
  "completed",
  "skipped",
  "cancelled",
]);
export const queuePriorityEnum = pgEnum("queue_priority", [
  "routine",
  "urgent",
  "emergency",
]);

// Encounter Enums
export const encounterStatusEnum = pgEnum("encounter_status", [
  "planned",
  "arrived",
  "in_progress",
  "on_leave",
  "finished",
  "cancelled",
]);
export const encounterTypeEnum = pgEnum("encounter_type", [
  "outpatient",
  "inpatient",
  "emergency",
  "home_visit",
  "virtual",
]);
export const encounterClassEnum = pgEnum("encounter_class", [
  "ambulatory",
  "inpatient",
  "emergency",
  "observation",
]);

// Diagnosis Enums
export const diagnosisTypeEnum = pgEnum("diagnosis_type", [
  "primary",
  "secondary",
  "admission",
  "discharge",
]);
export const diagnosisVerificationEnum = pgEnum("diagnosis_verification", [
  "confirmed",
  "provisional",
  "differential",
  "refuted",
]);

// Prescription Enums
export const prescriptionStatusEnum = pgEnum("prescription_status", [
  "draft",
  "active",
  "completed",
  "cancelled",
  "on_hold",
]);
export const dosageFormEnum = pgEnum("dosage_form", [
  "tablet",
  "capsule",
  "syrup",
  "injection",
  "ointment",
  "drops",
  "inhaler",
  "suppository",
  "other",
]);
export const frequencyEnum = pgEnum("frequency", [
  "once_daily",
  "twice_daily",
  "three_times_daily",
  "four_times_daily",
  "every_8_hours",
  "every_12_hours",
  "every_24_hours",
  "as_needed",
  "other",
]);

// Lab Enums
export const labTestCategoryEnum = pgEnum("lab_test_category", [
  "hematology",
  "chemistry",
  "urinalysis",
  "serology",
  "microbiology",
  "histopathology",
  "other",
]);
export const labTestTypeEnum = pgEnum("lab_test_type", [
  "blood",
  "serum",
  "plasma",
  "urine",
  "stool",
  "sputum",
  "swab",
  "csf",
  "other",
]);
export const labResultTypeEnum = pgEnum("lab_result_type", [
  "numeric",
  "text",
  "coded",
]);
export const labResultInterpretationEnum = pgEnum("lab_result_interpretation", [
  "normal",
  "low",
  "high",
  "critical_low",
  "critical_high",
  "abnormal",
]);
export const labQueueStatusEnum = pgEnum("lab_queue_status", [
  "pending",
  "collecting",
  "received",
  "processing",
  "resulted",
  "authorized",
  "completed",
  "cancelled",
]);
export const labQueuePriorityEnum = pgEnum("lab_queue_priority", [
  "routine",
  "urgent",
  "stat",
]);
export const specimenStatusEnum = pgEnum("specimen_status", [
  "collected",
  "in_transit",
  "received",
  "processing",
  "stored",
  "disposed",
]);
export const specimenConditionEnum = pgEnum("specimen_condition", [
  "satisfactory",
  "hemolyzed",
  "lipemic",
  "clotted",
  "insufficient",
  "other",
]);
export const labResultStatusEnum = pgEnum("lab_result_status", [
  "preliminary",
  "final",
  "amended",
  "cancelled",
]);
export const diagnosticReportStatusEnum = pgEnum("diagnostic_report_status", [
  "registered",
  "partial",
  "preliminary",
  "final",
  "amended",
  "corrected",
  "cancelled",
]);
export const criticalNotificationMethodEnum = pgEnum(
  "critical_notification_method",
  ["phone", "in_person", "sms"]
);

// Dental Enums
export const toothConditionEnum = pgEnum("tooth_condition", [
  "healthy",
  "decayed",
  "missing",
  "filled",
  "crown",
  "bridge",
  "implant",
  "root_canal",
  "extraction",
  "other",
]);
export const dentalProcedureTypeEnum = pgEnum("dental_procedure_type", [
  "extraction",
  "filling",
  "root_canal",
  "crown",
  "bridge",
  "implant",
  "scaling",
  "cleaning",
  "whitening",
  "other",
]);

// KIA Enums
export const pregnancyStatusEnum = pgEnum("pregnancy_status", [
  "ongoing",
  "delivered",
  "miscarried",
  "terminated",
  "ectopic",
]);
export const pregnancyRiskEnum = pgEnum("pregnancy_risk", [
  "low",
  "medium",
  "high",
]);
export const deliveryMethodEnum = pgEnum("delivery_method", [
  "spontaneous",
  "vacuum",
  "forceps",
  "cesarean",
]);
export const deliveryOutcomeEnum = pgEnum("delivery_outcome", [
  "live_birth",
  "stillbirth",
  "neonatal_death",
]);
export const immunizationTypeEnum = pgEnum("immunization_type", [
  "bcg",
  "hepatitis_b",
  "polio",
  "dpt",
  "hib",
  "pcv",
  "rotavirus",
  "mmr",
  "je",
  "influenza",
  "other",
]);

// Inpatient Enums
export const roomClassEnum = pgEnum("room_class", [
  "vvip",
  "vip",
  "class_1",
  "class_2",
  "class_3",
  "icu",
  "nicu",
  "isolation",
]);
export const bedStatusEnum = pgEnum("bed_status", [
  "available",
  "occupied",
  "maintenance",
  "reserved",
]);
export const admissionStatusEnum = pgEnum("admission_status", [
  "admitted",
  "transferred",
  "discharged",
  "deceased",
]);
export const admissionTypeEnum = pgEnum("admission_type", [
  "emergency",
  "elective",
  "transfer",
  "maternity",
]);
export const dischargeDispositionEnum = pgEnum("discharge_disposition", [
  "home",
  "transfer",
  "rehab",
  "long_term_care",
  "deceased",
  "ama",
]);

// Pharmacy Enums
export const medicationTypeEnum = pgEnum("medication_type", [
  "prescription",
  "otc",
  "controlled",
  "supplement",
]);
export const controlledSubstanceScheduleEnum = pgEnum(
  "controlled_substance_schedule",
  [
    "schedule_1",
    "schedule_2",
    "schedule_3",
    "schedule_4",
    "schedule_5",
    "non_controlled",
  ]
);
export const stockMovementTypeEnum = pgEnum("stock_movement_type", [
  "purchase",
  "sale",
  "return",
  "adjustment",
  "transfer",
  "expiration",
  "damage",
  "dispense",
]);
export const dispenseStatusEnum = pgEnum("dispense_status", [
  "pending",
  "dispensed",
  "partially_dispensed",
  "cancelled",
]);
export const marStatusEnum = pgEnum("mar_status", [
  "scheduled",
  "given",
  "refused",
  "missed",
  "held",
]);

// Billing Enums
export const serviceTariffCategoryEnum = pgEnum("service_tariff_category", [
  "consultation",
  "procedure",
  "lab",
  "radiology",
  "pharmacy",
  "room",
  "nursing",
  "other",
]);
export const chargeStatusEnum = pgEnum("charge_status", [
  "pending",
  "invoiced",
  "paid",
  "cancelled",
  "adjusted",
]);
export const chargeSourceTypeEnum = pgEnum("charge_source_type", [
  "encounter",
  "procedure",
  "medication",
  "lab",
  "room",
  "nursing",
  "other",
]);
export const chargeAdjustmentTypeEnum = pgEnum("charge_adjustment_type", [
  "discount",
  "correction",
  "write_off",
  "reversal",
]);
export const invoiceTypeEnum = pgEnum("invoice_type", [
  "outpatient",
  "inpatient",
  "pharmacy_only",
  "lab_only",
]);
export const payerTypeEnum = pgEnum("payer_type", [
  "self_pay",
  "bpjs",
  "insurance",
  "corporate",
]);
export const invoiceStatusEnum = pgEnum("invoice_status", [
  "draft",
  "pending",
  "partial",
  "paid",
  "cancelled",
  "void",
]);
export const paymentMethodEnum = pgEnum("payment_method", [
  "cash",
  "debit",
  "credit",
  "qris",
  "transfer",
  "deposit",
  "insurance",
  "bpjs",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "completed",
  "partial",
  "cancelled",
  "refunded",
]);
export const depositStatusEnum = pgEnum("deposit_status", [
  "active",
  "applied",
  "refunded",
  "expired",
]);
export const refundStatusEnum = pgEnum("refund_status", [
  "pending",
  "approved",
  "processed",
  "rejected",
]);
export const cashClosingShiftEnum = pgEnum("cash_closing_shift", [
  "morning",
  "afternoon",
  "evening",
  "night",
]);
export const cashClosingStatusEnum = pgEnum("cash_closing_status", [
  "pending",
  "closed",
  "verified",
]);
export const varianceStatusEnum = pgEnum("variance_status", [
  "balanced",
  "short",
  "over",
]);

// Reporting Enums
export const reportCategoryEnum = pgEnum("report_category", [
  "operational",
  "clinical",
  "financial",
  "regulatory",
  "kia",
]);
export const reportFrequencyEnum = pgEnum("report_frequency", [
  "daily",
  "weekly",
  "monthly",
  "on_demand",
]);
export const reportFormatEnum = pgEnum("report_format", [
  "pdf",
  "excel",
  "csv",
]);
export const reportGenerationStatusEnum = pgEnum("report_generation_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

// SatuSehat Enums
export const satusehatEnvironmentEnum = pgEnum("satusehat_environment", [
  "sandbox",
  "production",
]);
export const satusehatResourceTypeEnum = pgEnum("satusehat_resource_type", [
  "Patient",
  "Practitioner",
  "PractitionerRole",
  "Location",
  "Encounter",
  "Condition",
  "Observation",
  "Procedure",
  "MedicationRequest",
  "MedicationDispense",
  "ServiceRequest",
  "DiagnosticReport",
  "Composition",
]);
export const satusehatOperationEnum = pgEnum("satusehat_operation", [
  "create",
  "update",
  "search",
]);
export const satusehatSyncStatusEnum = pgEnum("satusehat_sync_status", [
  "pending",
  "processing",
  "completed",
  "failed",
  "skipped",
]);
export const satusehatErrorCategoryEnum = pgEnum("satusehat_error_category", [
  "transient",
  "client",
  "auth",
  "not_found",
  "server",
  "unknown",
]);
export const satusehatErrorResolutionEnum = pgEnum(
  "satusehat_error_resolution",
  ["pending", "auto_resolved", "manual_resolved", "ignored"]
);
export const satusehatConsentScopeEnum = pgEnum("satusehat_consent_scope", [
  "all",
  "encounter_only",
  "none",
]);
export const satusehatConsentMethodEnum = pgEnum("satusehat_consent_method", [
  "written",
  "verbal",
  "electronic",
]);
export const satusehatLookupStatusEnum = pgEnum("satusehat_lookup_status", [
  "found",
  "not_found",
  "error",
]);
export const satusehatVerificationMethodEnum = pgEnum(
  "satusehat_verification_method",
  ["nik_lookup", "manual"]
);

// BPJS Enums
export const bpjsFacilityTypeEnum = pgEnum("bpjs_facility_type", [
  "fktp",
  "fkrtl",
]);
export const bpjsEnvironmentEnum = pgEnum("bpjs_environment", [
  "development",
  "production",
]);
export const bpjsHealthStatusEnum = pgEnum("bpjs_health_status", [
  "healthy",
  "degraded",
  "unhealthy",
]);
export const bpjsPelayananEnum = pgEnum("bpjs_pelayanan", [
  "rawat_inap",
  "rawat_jalan",
]);
export const bpjsAsalRujukanEnum = pgEnum("bpjs_asal_rujukan", [
  "fktp",
  "fkrtl",
]);
export const bpjsTipeRujukanEnum = pgEnum("bpjs_tipe_rujukan", ["0", "1", "2"]);
export const bpjsPembiayaanEnum = pgEnum("bpjs_pembiayaan", ["1", "2", "3"]);
export const bpjsLakaLantasEnum = pgEnum("bpjs_laka_lantas", [
  "bukan",
  "kll",
  "kk",
  "kll_kk",
]);
export const bpjsTujuanKunjEnum = pgEnum("bpjs_tujuan_kunj", [
  "normal",
  "prosedur",
  "konsul_dokter",
]);
export const bpjsRujukanStatusEnum = pgEnum("bpjs_rujukan_status", [
  "active",
  "used",
  "expired",
  "cancelled",
]);
export const bpjsAntreanStatusEnum = pgEnum("bpjs_antrean_status", [
  "booked",
  "checkin",
  "called",
  "serving",
  "done",
  "cancelled",
]);
export const bpjsJenisKunjunganEnum = pgEnum("bpjs_jenis_kunjungan", [
  "1",
  "2",
  "3",
  "4",
]);
export const bpjsInacbgStatusEnum = pgEnum("bpjs_inacbg_status", [
  "pending",
  "grouped",
  "submitted",
  "purified",
  "verified",
  "paid",
  "rejected",
]);
export const bpjsVerificationStatusEnum = pgEnum("bpjs_verification_status", [
  "pending",
  "approved",
  "partial",
  "rejected",
]);
export const bpjsSepStatusEnum = pgEnum("bpjs_sep_status", [
  "created",
  "used",
  "updated",
  "deleted",
]);
export const bpjsSeverityLevelEnum = pgEnum("bpjs_severity_level", [
  "I",
  "II",
  "III",
]);
export const bpjsJenisRawatEnum = pgEnum("bpjs_jenis_rawat", [
  "rawat_inap",
  "rawat_jalan",
]);

// ============================================================================
// BASE TABLES
// ============================================================================

/**
 * Base table with common fields for all tables
 */
export const baseFields = {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
};

/**
 * Base table with soft delete support
 */
export const softDeleteFields = {
  ...baseFields,
  deletedAt: timestamp("deleted_at"),
  deletedBy: uuid("deleted_by"),
};

/**
 * Base table with BSON/JSONB resource storage
 */
export const bsonFields = {
  resource: jsonb("resource").$type<BsonResource>(),
};

/**
 * Base table for audit trail
 */
export const auditFields = {
  createdBy: uuid("created_by"),
  updatedBy: uuid("updated_by"),
  version: timestamp("version").defaultNow(),
};

/**
 * Helper function to create a table with standard fields
 */
export function createTable(name: string) {
  return pgTable(name, {
    ...baseFields,
  });
}

/**
 * Helper function to create a table with soft delete support
 */
export function createSoftDeleteTable(name: string) {
  return pgTable(name, {
    ...softDeleteFields,
  });
}

/**
 * Helper function to create a table with BSON support
 */
export function createBsonTable(name: string) {
  return pgTable(name, {
    ...baseFields,
    ...bsonFields,
  });
}

/**
 * Helper function to create a table with audit trail
 */
export function createAuditTable(name: string) {
  return pgTable(name, {
    ...baseFields,
    ...auditFields,
  });
}

/**
 * Helper function to create a table with all standard features
 */
export function createFullTable(name: string) {
  return pgTable(name, {
    ...baseFields,
    ...bsonFields,
    ...auditFields,
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),
  });
}

// ============================================================================
// COMMON INDEXES
// ============================================================================

/**
 * Common index definitions
 */
export const commonIndexes = {
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
  status: "status",
  active: "is_active",
};
