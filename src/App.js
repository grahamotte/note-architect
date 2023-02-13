import "./App.css";
import React, { useState, useEffect } from "react";
import { merge } from "lodash";

const App = () => {
  // const [ass, setAss] = useState({
  //   A: {
  //     one: {
  //       a: true,
  //       b: true,
  //     },
  //     two: {
  //       c: true,
  //       d: true,
  //     },
  //   },
  // });
  // console.log(ass);

  const [ass, setAss] = useState({
    Themes: {
      Relational: {
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
        "exploration of relationships with children": false,
        "exploration of parenting concerns": false,
        "exploration of relationships with friends": false,
        "exploring relational concerns and issues in the workplace": false,
        "coping with conflict with authorities at work": false,
        "exploring relational concerns and issues in school": false,
        "exploration of positive interpersonal experiences": false,
        "recent positive relational experiences": false,
      },
      Trauma: {
        "expression of stressful experiences": false,
        "exploration and discussion of recent traumatic experiences": false,
        "exploration of childhood traumas and neglect": false,
        "exploration of multiple traumatic events and cumulative trauma in childhood/adolescence": false,
        "exploration of impact of sexual abuse experiences experienced in childhood/adolescence": false,
        "exploration of emotional neglect experienced during childhood/adolescence": false,
        "exploration of transgenerational traumas": false,
        "exploration of vicarious traumatic experiences": false,
        "exploration of health concerns and illness": false,
        "exploration of end of life anxieties, fears, and concerns": false,
      },
      Identity: {
        "exploration of low self-esteem and poor confidence": false,
        "working toward improved self-esteem and confidence": false,
        "exploration of bodily anxieties and distorted body image": false,
        "conflicts and concerns regarding ethnic/cultural identity": false,
        "exploration of anxieties regarding gender and/or sexuality identity": false,
        "exploration of conflicts regarding masculinity and/or issues of male sexuality": false,
        "exploration of conflicts regarding femininity and/or issues of female sexuality": false,
        "exploration of conflicts and anxieties regarding masculinity": false,
        "exploration of conflicts and anxieties regarding femininity": false,
        "exploration of obstacles to identity development in adolescence": false,
        "exploration of adolescent identity concerns": false,
        "expression and exploration of crisis of identity": false,
        "working toward integration of adult identity": false,
        "exploration of mid-life identity concerns and meaning": false,
        "exploration of late-life identity formation and concerns": false,
        "life-review as part of later-life identity consolidation": false,
        "expression and exploration of discontinuities in self-state experiences": false,
        "difficulties with boundaries and self-assertion": false,
        "awareness and exploration of deficits in self-preservation": false,
        "exploration of feelings of lack of entitlement": false,
        "working toward securing a 'right to a life,' appropriate entitlement and independence": false,
        "exploration and working through of 'false-self' states and their relationship to early life experiences": false,
        "exploration of guilt feelings and inhibitions regarding pleasure and success": false,
      },
      Process: {
        "exploration of life experiences and self-understanding": false,
        "expression and development of 'true self' experiences and enhanced authenticity": false,
        "development of self-care and self-preservation": false,
        "development of inner security": false,
        "ongoing work toward greater self-empathy": false,
        "ongoing work toward greater mindfulness": false,
        "exploration and working through of inner self-criticism, self-punishment and self-denial": false,
        "working through and exploration of inhibitions regarding success and accomplishment": false,
        "exploration of conflicts regarding entitlement and self-validation": false,
        "exploration of dream life": false,
        "exploration of fantasy life": false,
        "exploration of the therapeutic relationship": false,
        "ongoing working through of transferences": false,
        "exploration of characterological and interpersonal difficulties as revisited within the therapeutic relationship": false,
        "continued exploration of the impact of early life on current identity": false,
        "expression and discussion of problematic beliefs and schemas": false,
        "exploration and evaluation of target behaviors and areas of concern": false,
        "discussion of medication and its impact": false,
        "exploration and discussion of recent homework assignments": false,
        "review of the therapeutic work to date": false,
        "exploration of therapeutic goals and aims": false,
        "revision of therapeutic goals and aims": false,
      },
      "Mourning / Loss": {
        "expression and exploration of recent loss": false,
        "continued working through of traumatic losses": false,
        "continued mourning of childhood losses": false,
        "exploration of unhappy childhood experiences and losses throughout life": false,
      },
      Adjustment: {
        "transition to adulthood and adult responsibilities": false,
        "strain of mid-life transitions": false,
        "coping with recent changes in family life": false,
        "late-life adjustment and coping with age-related changes": false,
        "adjustment to recent motherhood": false,
        "adjustment to recent fatherhood": false,
        "parenting anxieties and concerns": false,
        "adjustment to separation from child/children": false,
        "work life and occupational concerns": false,
        "coping with stress at school": false,
        "adjustment to university life and studies": false,
        "adjustment to new demands in life situation": false,
        "adaptation to physical illness": false,
      },
      "Daily Life": {
        "management and coping with daily life": false,
        "structuring of daily life and making plans for the future": false,
        "coping with day to day organizational difficulties": false,
        "dealing with self-care (e.g., eating, sleeping, finances)": false,
        "dealing with inhibitions regarding help seeking and turning to others for support": false,
        "working toward the further development of hobbies and constructive leisure activities": false,
        "working toward improved health life style": false,
        "how to create better balance between work, relational, recreational, and self needs": false,
        "development of greater self-assertion and effective interpersonal communication": false,
      },
      "Specific Difficulties": {
        "dealing with panic and anxiety states": false,
        "exploration and coping with depression and sadness": false,
        "awareness and exploration of feelings of powerlessness, hopelessness and helplessness": false,
        "exploration of capacity to return to work": false,
        "coping with and management of impulses to self-mutilate": false,
        "coping with and management of impulses to self-harm": false,
        "coping with suicidal thoughts and feelings": false,
        "coping with exhaustion and burn out in work activities": false,
        "working through and management of anorectic behavior and related difficulties": false,
        "coping and working through of difficulties with chronic binge eating": false,
        "exploration and coping with obesity and related eating difficulties": false,
        "coping with and working through of drug dependence and abuse": false,
        "coping with and working through of addictions and related concerns": false,
        "exploration of sleep disturbance": false,
        "coping with sexual difficulties": false,
        "awareness and exploration of possible psychosomatic reactions": false,
        "awareness and exploration of perfectionistic tendencies": false,
        "issues of impulse control and containment of affects": false,
        "awareness and exploration of underlying aggression and feelings of rage": false,
        "exploration and working through of guilt and related anxieties": false,
        "exploration of anxieties regarding healthy dependency": false,
        "awareness and exploration of underlying needs for care and support": false,
        "awareness and exploration of tendency to push others away in response to anxiety": false,
        "exploration and working through of difficulties with trust in interpersonal relationships": false,
        "development of internal self-care and maternal self-function": false,
        "development and working toward greater creativity and capacity for play": false,
        "development of expanded spiritual and creative experience": false,
        "development of occupational functioning and pleasure in work activities": false,
      },
    },
    Symptoms: {
      Affective: {
        "sadness and depressed mood": false,
        "persistent dysphoria and sadness": false,
        "feelings of exhaustion and fatigue": false,
        "feeling bereft and sorrowful": false,
        "feeling guilty and worthless": false,
        "feeling anxious and tense": false,
        "feeling stressed and worried": false,
        "feelings of agitation": false,
        "feelings of anxiety and panic": false,
        "feelings of irritability": false,
        "anger and episodes of rage": false,
        "persistent feelings of anger": false,
        "feeling restless and speedy": false,
        "feelings of manic excitement": false,
        "a hypomanic state": false,
        "mood swings and labile affect": false,
        "difficulties with impulse control and containment of affects": false,
        "feelings of indifference and apathy": false,
        "flat affect and emotional detachment": false,
        "feelings of emptiness": false,
        "feelings of loneliness and isolation": false,
        "feelings of insignificance and alienation": false,
      },
      "Grief and Mourning": {
        "mourning the loss of a loved one": false,
        "a mourning reaction": false,
        "unresolved mourning and grief": false,
        "prolonged mourning and grief": false,
      },
      Relational: {
        "relational difficulties": false,
        "recent relational conflict": false,
        "relational frustrations": false,
        "struggles with social anxiety": false,
        "anger and envy in interpersonal relationships": false,
        "feelings of rejection in interpersonal relationships": false,
        "difficulties with boundaries in interpersonal relationships": false,
        "a crisis situation in the family": false,
        "conflict with family members": false,
        "marital/relational conflict with spouse/partner": false,
        "parenting concerns and managing relationships with children": false,
        "struggling with adjustment to recent motherhood": false,
        "struggling with adjustment to recent fatherhood": false,
        "parenting anxieties and concerns": false,
        "difficulty adjusting to separation from child/children": false,
        "struggling to cope with recent changes in family life": false,
        "relational concerns and issues in the workplace": false,
        "conflict with authorities at work": false,
        "relational concerns and issues at school": false,
        "difficulties with trust in interpersonal relationships": false,
        "the tendency to push others away in response to anxiety and need": false,
      },
      Sexuality: {
        "sexual difficulties and concerns": false,
        "concerns regarding sexual identity": false,
        "concerns regarding sexual desire": false,
        "concerns regarding sexual performance": false,
        "concerns regarding sexual preferences": false,
      },
      "Work and/or School": {
        "work life and occupational concerns": false,
        "difficulties with adjustment to a new work situation": false,
        "the impact of a loss of employment": false,
        "distress regarding financial issues": false,
        "coping with stress at school": false,
        "difficulties with adjustment to university life and studies": false,
        "anxieties about returning to work": false,
        "anxieties about returning to school": false,
        "transitioning back to work life": false,
        "exhaustion and burn out in work activities": false,
        "concerns and anxieties regarding retirement": false,
      },
      "Self and Identity": {
        "low self-esteem and poor confidence": false,
        "feelings of insecurity": false,
        "struggling with self-care and self-preservation": false,
        "struggling with self-criticism, self-punishment and self-denial": false,
        "bodily anxieties and distorted body image": false,
        "concerns regarding ethnic and/or cultural identity": false,
        "anxieties regarding sexual identity": false,
        "conflicts regarding masculinity and issues of male sexuality": false,
        "conflicts regarding femininity and issues of female sexuality": false,
        "conflicts and anxieties regarding masculinity": false,
        "conflicts and anxieties regarding femininity": false,
        "obstacles to identity development experienced in adolescence": false,
        "adolescent identity concerns": false,
        "a crisis of identity and meaning": false,
        "mid-life identity concerns": false,
        "late-life identity concerns": false,
        "experiences of self-state discontinuity": false,
        "difficulties with boundaries and self-assertion": false,
        "deficits in self-preservation": false,
        "feelings of lack of entitlement": false,
        "feelings of over-entitlement": false,
        "feeling false and like an imposter": false,
        "guilt and inhibitions regarding success and accomplishments": false,
        "anxieties about enjoying pleasure and leisure activities": false,
        "distress regarding spiritual and/or religious life": false,
        "distress related to perfectionistic tendencies": false,
        "anxiety regarding dependency needs": false,
        "difficulties turning to others for care and support": false,
        "anxiety and concerns regarding gender identity": false,
      },
      Trauma: {
        "recently experienced severe life stress": false,
        "recent traumatic experiences and their impact": false,
        "the impact of being the victim of a crime": false,
        "the impact of childhood traumas and neglect": false,
        "the impact of multiple traumatic events and cumulative trauma": false,
        "distress regarding experienced sexual abuse and its impact": false,
        "distress regarding emotional neglect experienced during childhood/adolescence": false,
        "the emotional and psychological impact of transgenerational traumas": false,
        "the impact of vicarious traumatic experiences": false,
      },
      "Adjustment and Transition": {
        "difficulties related to transition to adulthood and adult responsibilities": false,
        "strain of mid-life transitions": false,
        "late-life adjustment and coping with age-related changes": false,
        "adjustment to new demands in life situation": false,
      },
      "Basic Functioning and Coping": {
        "difficulties with management and coping with daily life": false,
        "difficulties structuring daily life and making plans for the future": false,
        "day to day organizational difficulties": false,
        "dealing with and maintaining self-care (e.g., eating, sleeping, finances)": false,
        "difficulty engaging in hobbies and constructive leisure activities": false,
        "difficulty initiating and maintaining a healthful life style": false,
        "a lack of balance between work, relational, recreational, and self needs": false,
        "difficulties with self-assertion and effective interpersonal communication": false,
        "inhibitions in creative pursuits and the capacity for play": false,
      },
      "Self-Harm and Risk Behaviors": {
        "impulses to self-mutilate": false,
        "engaging in self-mutilating behaviors": false,
        "impulses to self-harm": false,
        "engaging in self-harm behaviors": false,
        "suicidal thoughts and feelings": false,
        "suicidal preoccupations and being at risk for suicide": false,
        "impulses to harm and injure others": false,
        "violent fantasies": false,
        "impulses to harm others and being at risk for acting out violent wishes": false,
      },
      "Eating and Sleeping": {
        "anorectic behavior and related difficulties": false,
        "difficulties with chronic binge eating": false,
        "bulimic behavior and related difficulties": false,
        "difficulties with food restriction and conflicts regarding eating": false,
        "distress related to obesity and related eating difficulties": false,
        "sleep disturbances": false,
        insomnia: false,
      },
      "Addiction and Substance Abuse": {
        "struggling with drug dependence and abuse": false,
        "struggling with alcohol dependence and abuse": false,
        "addictions and related concerns": false,
        "difficulties with gambling and related concerns": false,
        "distress related to sexual addiction and related concerns": false,
      },
      "Mental State": {
        "changes in memory function": false,
        "memory loss and impairment": false,
        "impaired language function": false,
        "deficits in attention and concentration": false,
        "disorientation and visuospatial deficits": false,
        "a decline in general cognitive/intellectual functioning": false,
        "poor capacity for reflection": false,
        "impaired judgment": false,
        "concrete thinking with little capacity for abstraction": false,
        "a slowing of thought and reduced mental energy": false,
        "inhibition of thought and associations": false,
        "obsessional preoccupation": false,
        "dissociative features": false,
        "phobic preoccupation": false,
        "a post-traumatic reaction": false,
        "a potential underlying psychotic process": false,
        "some deficits in reality testing": false,
        "serious reality testing deficits": false,
        "confusion and disorganization of thought": false,
        "hypomanic features": false,
        "manic features": false,
        "suicidal ideation/fantasy": false,
      },
    },
  });

  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const isMobile = windowSize.width <= 768;
  const [preview, setPreview] = useState(false);
  const showPreview = !isMobile || preview;
  const showOptions = !isMobile ? true : !preview;
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowSize({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      });
    };
  }, []);

  const prefixJoinStr = (prefix, items) => {
    if (items.length === 0) {
      return undefined;
    } else if (items.length === 1) {
      return `${prefix} ${items[0]}. `;
    } else if (items.length === 2) {
      return `${prefix} ${items[0]} and ${items[1]}. `;
    } else {
      return `${prefix}: ${items.join("; ")}. `;
    }
  };

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

  const keys = (sec, sub = undefined) => {
    const set =
      sub === undefined ? merge({}, ...Object.values(ass[sec])) : ass[sec][sub];
    return Object.keys(set).filter((k) => set[k]);
  };

  const Badge = ({ sec, sub }) => {
    const k = keys(sec, sub);

    if (k.length === 0) return;

    return (
      <span
        className={`badge ${
          (sub || sec) === section ? "bg-light text-dark" : "bg-dark text-light"
        }`}
      >
        {k.length}
      </span>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand" href="#">
            <i className="fa-solid fa-pen-nib me-2 ms-2" /> Note Architect
          </span>
          {isMobile && (
            <span>
              <button
                type="button"
                className="btn bg-white"
                onClick={() => setPreview(!preview)}
              >
                {preview ? "Edit" : "View"}
              </button>
            </span>
          )}
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          {showOptions && (
            <div className="col pt-3 pb-3 border-end border-1">
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
                      {x} <Badge sec={x} />
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
                      {x} <Badge sec={section} sub={x} />
                    </button>
                  );
                })}
              </div>
              {Object.keys(ass[section][subSection]).map((x) => {
                const checked = ass[section][subSection][x];

                return (
                  <div
                    className="d-grid gap-2 mb-1"
                    key={`${section}:${subSection}:${x}`}
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
          )}
          {showPreview && (
            <div className={`col-${isMobile ? 12 : 4} pt-3 pb-3`}>
              {prefixJoinStr(
                "The client and I met in order to discuss",
                keys("Themes")
              )}
              {prefixJoinStr(
                "Symptoms and presenting issues include",
                keys("Symptoms")
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
