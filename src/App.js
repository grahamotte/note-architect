import "./App.css";
import React, { useState } from "react";

const App = () => {
  const [ass, setAss] = useState({
    subjective: {
      "affective state": {
        "generally positive": false,
        "generally content": false,
        "calm and reflective": false,
        improved: false,
        "mainly unhappy": false,
        sad: false,
        dysphoric: false,
        "rather distressed": false,
        "mildly depressed": false,
        "moderately depressed": false,
        "quite depressed": false,
        "marked by hopelessness": false,
        withdrawn: false,
        detached: false,
        flat: false,
        nervous: false,
        "mildly anxious": false,
        "moderately anxious": false,
        "quite anxious": false,
        panicky: false,
        agitated: false,
        "over-stimulated": false,
        excited: false,
        irritable: false,
        angry: false,
        enraged: false,
        regressed: false,
        uncontained: false,
        labile: false,
        tired: false,
      },
      relational: {
        "relational difficulties": false,
        "recent relational conflict": false,
        "coping with relational frustrations": false,
        "struggles with social anxiety": false,
        "coping with anger and envy in interpersonal relationships": false,
        "coping with feelings of rejection in interpersonal relationships": false,
        "difficulties with boundaries in interpersonal relationships": false,
        "securing appropriate boundaries": false,
        "crisis situation in family": false,
        "conflict with family members": false,
        "working through interpersonal/family experiences": false,
        "interpersonal difficulties with spouse/partner": false,
        "sexual difficulties and/or concerns": false,
        "exploration of family life": false,
        "exploration of relationship with father": false,
        "exploration of relationship with mother": false,
        "exploration of relationships with sibling(s)": false,
      },
      trauma: {
        "relational difficulties": false,
        "recent relational conflict": false,
        "coping with relational frustrations": false,
        "struggles with social anxiety": false,
        "coping with anger and envy in interpersonal relationships": false,
        "coping with feelings of rejection in interpersonal relationships": false,
        "difficulties with boundaries in interpersonal relationships": false,
        "securing appropriate boundaries": false,
        "crisis situation in family": false,
        "conflict with family members": false,
        "working through interpersonal/family experiences": false,
        "interpersonal difficulties with spouse/partner": false,
        "sexual difficulties and/or concerns": false,
        "exploration of family life": false,
        "exploration of relationship with father": false,
        "exploration of relationship with mother": false,
        "exploration of relationships with sibling(s)": false,
      },
      identity: {
        "relational difficulties": false,
        "recent relational conflict": false,
        "coping with relational frustrations": false,
        "struggles with social anxiety": false,
        "coping with anger and envy in interpersonal relationships": false,
        "coping with feelings of rejection in interpersonal relationships": false,
        "difficulties with boundaries in interpersonal relationships": false,
        "securing appropriate boundaries": false,
        "crisis situation in family": false,
        "conflict with family members": false,
        "working through interpersonal/family experiences": false,
        "interpersonal difficulties with spouse/partner": false,
        "sexual difficulties and/or concerns": false,
        "exploration of family life": false,
        "exploration of relationship with father": false,
        "exploration of relationship with mother": false,
        "exploration of relationships with sibling(s)": false,
      },
    },
    objective: {
      affective: {
        "relational difficulties": false,
        "recent relational conflict": false,
        "coping with relational frustrations": false,
        "struggles with social anxiety": false,
        "coping with anger and envy in interpersonal relationships": false,
        "coping with feelings of rejection in interpersonal relationships": false,
        "difficulties with boundaries in interpersonal relationships": false,
        "securing appropriate boundaries": false,
        "crisis situation in family": false,
        "conflict with family members": false,
        "working through interpersonal/family experiences": false,
        "interpersonal difficulties with spouse/partner": false,
        "sexual difficulties and/or concerns": false,
        "exploration of family life": false,
        "exploration of relationship with father": false,
        "exploration of relationship with mother": false,
        "exploration of relationships with sibling(s)": false,
      },
      mental: {
        "relational difficulties": false,
        "recent relational conflict": false,
        "coping with relational frustrations": false,
        "struggles with social anxiety": false,
        "coping with anger and envy in interpersonal relationships": false,
        "coping with feelings of rejection in interpersonal relationships": false,
        "difficulties with boundaries in interpersonal relationships": false,
        "securing appropriate boundaries": false,
        "crisis situation in family": false,
        "conflict with family members": false,
        "working through interpersonal/family experiences": false,
        "interpersonal difficulties with spouse/partner": false,
        "sexual difficulties and/or concerns": false,
        "exploration of family life": false,
        "exploration of relationship with father": false,
        "exploration of relationship with mother": false,
        "exploration of relationships with sibling(s)": false,
      },
    },
    assessment: {
      global: {
        "relational difficulties": false,
        "recent relational conflict": false,
        "coping with relational frustrations": false,
        "struggles with social anxiety": false,
        "coping with anger and envy in interpersonal relationships": false,
        "coping with feelings of rejection in interpersonal relationships": false,
        "difficulties with boundaries in interpersonal relationships": false,
        "securing appropriate boundaries": false,
        "crisis situation in family": false,
        "conflict with family members": false,
        "working through interpersonal/family experiences": false,
        "interpersonal difficulties with spouse/partner": false,
        "sexual difficulties and/or concerns": false,
        "exploration of family life": false,
        "exploration of relationship with father": false,
        "exploration of relationship with mother": false,
        "exploration of relationships with sibling(s)": false,
      },
      "level of functioning": {
        "relational difficulties": false,
        "recent relational conflict": false,
        "coping with relational frustrations": false,
        "struggles with social anxiety": false,
        "coping with anger and envy in interpersonal relationships": false,
        "coping with feelings of rejection in interpersonal relationships": false,
        "difficulties with boundaries in interpersonal relationships": false,
        "securing appropriate boundaries": false,
        "crisis situation in family": false,
        "conflict with family members": false,
        "working through interpersonal/family experiences": false,
        "interpersonal difficulties with spouse/partner": false,
        "sexual difficulties and/or concerns": false,
        "exploration of family life": false,
        "exploration of relationship with father": false,
        "exploration of relationship with mother": false,
        "exploration of relationships with sibling(s)": false,
      },
    },
  });
  const toggle = (sec, sub, key) => {
    setAss({
      ...ass,
      [sec]: {
        ...ass[sec],
        [sub]: {
          ...ass[sec][sub],
          [key]: !ass[sec][sub][key],
        },
      },
    });
  };

  const [section, setSection] = useState(Object.keys(ass)[0]);
  const [subSection, setSubSection] = useState(Object.keys(ass[section])[0]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand" href="#">
            Note Architect
          </span>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 pt-3 pb-3 border-end border-1">
            <div className="mb-2">
              {Object.keys(ass).map((x) => {
                return (
                  <button
                    key={x}
                    type="button"
                    className={`btn me-1 mb-1 ${
                      x === section ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => {
                      setSection(x);
                      setSubSection(Object.keys(ass[x])[0]);
                    }}
                  >
                    {x}
                  </button>
                );
              })}
            </div>
            <div className="mb-2">
              {Object.keys(ass[section]).map((x) => {
                return (
                  <button
                    key={`${section}${x}`}
                    type="button"
                    className={`btn me-1 mb-1 btn-sm ${
                      x === subSection ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => setSubSection(x)}
                  >
                    {x}
                  </button>
                );
              })}
            </div>

            {Object.keys(ass[section][subSection]).map((x) => {
              const checked = ass[section][subSection][x];
              return (
                <div
                  className="d-grid gap-2 mb-1"
                  key={`${section}${subSection}${x}`}
                >
                  <button
                    type="button"
                    className={`btn btn-sm text-start ${
                      checked ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => toggle(section, subSection, x)}
                  >
                    <i
                      className={
                        checked
                          ? "fa-solid fa-circle-check"
                          : "fa-regular fa-circle"
                      }
                    />{" "}
                    {x}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="col-4 pt-3 pb-3 ">
            {Object.values(ass["subjective"]["affective state"]).includes(
              true
            ) && (
              <span>
                The client's affective and emotional state was reported to be{" "}
                {Object.keys(ass["subjective"]["affective state"])
                  .filter((x) => ass["subjective"]["affective state"][x])
                  .join(", ")}
                .
              </span>
            )}

            {Object.values(ass["subjective"]["relational"]).includes(true) && (
              <span>
                The client's affective and emotional state was reported to be{" "}
                {Object.keys(ass["subjective"]["relational"])
                  .filter((x) => ass["subjective"]["relational"][x])
                  .join(", ")}
                .
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
