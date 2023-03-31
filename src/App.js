import "./App.css";
import React, { useState, useEffect } from "react";
import { merge, split, groupBy, toPairs } from "lodash";

const ASSESSMENT = {
  Heading: {
    Verification: {
      "Cx confirmed name and location (at home in CA).": false,
      "Cx confirmed name and location (at work in CA).": false,
    },
    "Risk Assessment": {
      "Clinician observed cx & cx denies SI/HI/SIB.": false,
    },
  },
  "New Clients": {
    All: {
      "Cx attended initial session. Therapist informed cx of practice policies, and mandated reporter status.": false,
      "Developments are being made in the therapeutic alliance.": false,
    },
  },
  "Reported Affective": {
    All: {
      okay: false,
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
  },
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
      "developing new homework assignments in collaboration with the client": false,
      "reviewing and exploring homework assignments": false,
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
    Identity: {
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
    "Mourning / Grief": {
      "mourning the loss of a loved one": false,
      "a mourning reaction": false,
      "unresolved mourning and grief": false,
      "prolonged mourning and grief": false,
    },
    Adjustment: {
      "difficulties related to transition to adulthood and adult responsibilities": false,
      "strain of mid-life transitions": false,
      "late-life adjustment and coping with age-related changes": false,
      "adjustment to new demands in life situation": false,
    },
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
    Sexuality: {
      "sexual difficulties and concerns": false,
      "concerns regarding sexual identity": false,
      "concerns regarding sexual desire": false,
      "concerns regarding sexual performance": false,
      "concerns regarding sexual preferences": false,
    },
    "Work / School": {
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
    "Daily Life": {
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
    "Self-Harm / Risk Behaviors": {
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
    "Eating / Sleeping": {
      "anorectic behavior and related difficulties": false,
      "difficulties with chronic binge eating": false,
      "bulimic behavior and related difficulties": false,
      "difficulties with food restriction and conflicts regarding eating": false,
      "distress related to obesity and related eating difficulties": false,
      "sleep disturbances": false,
      insomnia: false,
    },
    "Addiction / Substance Abuse": {
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
  Objective: {
    "Affective State": {
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
      "somewhat flat": false,
      "rather flat": false,
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
  Assessment: {
    "Global Assessment": {
      "The client's estimated global assessment of functioning appeared to be superior in most areas of life with no indication of emotional difficulty or distress. The client is not overwhelmed by life's difficulties and is able to enjoy relationships, work/school, and leisure time.": false,
      "The client's estimated global assessment of functioning appeared to be very good with minimal difficulties and is able to cope well in most areas of life (e.g., relationships, work/school, and leisure). The client is quite content and reports only everyday difficulties and concerns.": false,
      "The client's estimated global assessment of functioning appeared reasonably good with only short lived and expectable reactions to everyday stressful events. The client shows only slight difficulty in relational and/or work/school functioning.": false,
      "The client's estimated global assessment of functioning indicates a mild level of difficulty with some problems in relationships, work, or school functioning. The client is nonetheless functioning well and has some significant relationships.": false,
      "The client's estimated global assessment of functioning suggests a moderate degree of emotional distress and difficulty dealing with relationships, work and/or school life.": false,
      "The client's estimated global assessment of functioning suggests some serious emotional and psychological difficulties and quite serious impairment in relational, work and/or school functioning.": false,
      "The client's estimated global assessment of functioning indicates the client is struggling with very serious emotional and psychological difficulties that appear to be interfering with perceptions, judgment, thinking, communication and mood. The client is showing severe difficulties in most areas of life (e.g., relationships, work and school life).": false,
      "The client's estimated global assessment of functioning suggests that the client's behavior may be influenced by severe psychological difficulties, delusions and/or hallucinations and is unable to function in most areas of life (e.g., self-care, relationships, work life).": false,
      "The client's estimated global assessment of functioning suggests that the client is in some danger of harm to self or others and is having serious difficulty maintaining self-care and basic life functioning.": false,
      "The client's estimated global assessment of functioning suggests that there is a persistent and serious risk of causing harm to self or others.": false,
    },
    "Level of Functioning": {
      "The client's overall level of mental and emotional functioning suggests no difficulty and/or impairment.": false,
      "The client's overall level of mental and emotional functioning suggests mild difficulty and/or impairment.": false,
      "The client's overall level of mental and emotional functioning suggests moderate difficulty and/or impairment.": false,
      "The client's overall level of mental and emotional functioning suggests severe difficulty and/or impairment.": false,
      "The client's overall level of mental and emotional functioning suggests extreme difficulty and/or impairment.": false,
      "The client has no difficulty with comprehension of the social word and communication with others.": false,
      "The client has mild difficulty with comprehension of the social word and communication with others.": false,
      "The client has moderate difficulty with comprehension of the social word and communication with others.": false,
      "The client has severe difficulty with comprehension of the social word and communication with others.": false,
      "The client has extreme difficulty with comprehension of the social word and communication with others.": false,
      "The client has no difficulty in taking care of basic needs and self-care.": false,
      "The client has mild difficulty in taking care of basic needs and self-care.": false,
      "The client has moderate difficulty in taking care of basic needs and self-care.": false,
      "The client has severe difficulty in taking care of basic needs and self-care.": false,
      "The client has extreme difficulty in taking care of basic needs and self-care.": false,
      "The client has no difficulty with social interaction and interpersonal relationships.": false,
      "The client has mild difficulty with social interaction and interpersonal relationships.": false,
      "The client has moderate difficulty with social interaction and interpersonal relationships.": false,
      "The client has severe difficulty with social interaction and interpersonal relationships.": false,
      "The client has extreme difficulty with social interaction and interpersonal relationships.": false,
      "The client has no difficulty engaging in and maintaining day-to-day functioning at work, school and/or in the household.": false,
      "The client has mild difficulty engaging in and maintaining day-to-day functioning at work, school and/or in the household.": false,
      "The client has moderate difficulty engaging in and maintaining day-to-day functioning at work, school and/or in the household.": false,
      "The client has severe difficulty engaging in and maintaining day-to-day functioning at work, school and/or in the household.": false,
      "The client has extreme difficulty engaging in and maintaining day-to-day functioning at work, school and/or in the household.": false,
      "The client has no impairment in the ability to engage in social, family, and community functions and obligations.": false,
      "The client has mild impairment in the ability to engage in social, family, and community functions and obligations.": false,
      "The client has moderate impairment in the ability to engage in social, family, and community functions and obligations.": false,
      "The client has severe impairment in the ability to engage in social, family, and community functions and obligations.": false,
      "The client has extreme impairment in the ability to engage in social, family, and community functions and obligations.": false,
    },
    "Significant Developments": {
      "The client continues to make good progress with self-understanding and self-insight": false,
      "There is continued development of the client's capacity for self-care and life management": false,
      "Developments continue in the areas of family and relational functioning": false,
      "Developments continue in the areas of occupational functioning and achievement": false,
      "Developments continue in the areas of healthy separation and interdependence": false,
      "Developments continue in the area of containment of harmful acting out behavior": false,
      "The client continues to make steady gains in self-esteem and confidence": false,
      "The client shows reductions in self-destructive behavior": false,
      "A significant reduction in symptoms continues": false,
      "The client demonstrates a growing capacity for greater pleasure in relationships and work": false,
      "The client demonstrates a capacity for greater enjoyment of leisure time and creative projects": false,
      "The client shows an enhanced capacity for parenting and improved parenting of children": false,
      "Significant gains in self-assertion and positive self-promotion are evident": false,
      "The client displays enhanced feelings of appropriate entitlement": false,
      "Continued improvement in maintenance and respect of boundaries is evident": false,
      "The client continues to sustain gains made in reduced self-destructive behavior": false,
      "The client continues in process of re-working and alleviation of traumatic pain and stress": false,
      "The client continues to gain greater mastery over traumatic stimuli and fears": false,
      "The client demonstrates greater capacity for thought and reflection": false,
      "The recent crisis appears better contained": false,
      "The client is in a regressive period": false,
      "Recent crisis appears to be overwhelming client's current resources": false,
      "Planning for termination is underway": false,
      "Termination process is in progress": false,
    },
    "Treatment Motivation": {
      "is motivated and engaged in treatment": false,
      "is not motivated but somewhat engaged in treatment": false,
      "is resistance to treatment": false,
      "feels empowered about their treatment": false,
      "is nervous about treatment": false,
    },
    "Outstanding Issues": {
      "There are no current outstanding therapeutic issues or concerns.": false,
      "Self-destructive wishes and behaviors remain a significant therapeutic concern.": false,
      "Resistance to treatment recommendations remains a significant concern.": false,
      "The client's help-rejecting behaviors remain a significant therapeutic concern.": false,
      "The client's current regressive state is a significant concern.": false,
      "Treatment continues to show good evolution and development.": false,
      "Treatment to continue as indicated.": false,
    },
  },
  Interventions: {
    Supportive: {
      "supportive techniques": false,
      "an emphasis on the establishment and maintenance of the therapeutic frame": false,
      "an emphasis on self-expression": false,
      "an emphasis on here-and-now functioning": false,
      "an emphasis on containment of affect": false,
      "an emphasis on coping with current life difficulties": false,
      "a focus on improved problem solving and coping": false,
      "an emphasis on containment of recent regressive episode": false,
      "a focus on impulse control and anger management": false,
      "a focus on containment of acting-out behavior": false,
      "a focus on helping the client expand problem solving capacities": false,
      "an emphasis on strengthening self-care and self-preservation": false,
      "developing and maintaining the therapeutic alliance so as to facilitate and foster continued therapeutic work": false,
      "an emphasis on helping the client develop greater trust in the therapeutic setting, therapist, and interpersonal relationships": false,
      "an emphasis on clinical management": false,
    },
    "Cognitive Behavioral": {
      "cognitive-behavioral techniques": false,
      "an emphasis on evaluation and exploration of problematic automatic thoughts": false,
      "setting goals for the treatment and the session": false,
      "targeting more effective problem solving and coping skills in daily life": false,
      "an emphasis on addressing problematic core beliefs": false,
      "evaluating and addressing dysfunctional thoughts": false,
      "a review of therapeutic work done in previous sessions": false,
      "an evaluation and exploration of target issues and behaviors": false,
      "an exploration of feedback regarding previous sessions": false,
      "addressing the impact of current medications and their effects": false,
      "the use of role play to help address interpersonal difficulties": false,
      "the use of imagery to address fears and anxieties": false,
      "exploration and planning of in vivo exposure to help address anxieties and fears": false,
      "helping overcome overgeneralization in client's cognitive style": false,
      "addressing the client's tendency toward all-or-nothing thinking and how this impacts perceptions": false,
      "addressing and working to help client overcome the tendency to engage in catastrophization": false,
      "exploration of underlying schemas that impact thought and behavior": false,
      "an emphasis on the implementation and practice of relaxation techniques": false,
      "an emphasis on self-monitoring of thoughts, emotions and behavior": false,
      "Socratic questioning or guided discovery to help client address mental style": false,
      "providing client feedback regarding development and progress": false,
      "an emphasis on techniques for the development of greater confidence and self-efficacy": false,
      "an emphasis on self-assertiveness and confidence building": false,
      "an emphasis on the development of greater mindfulness and reflective capacity": false,
    },
    "Psychoanalytic / Psychodynamic": {
      "psychodynamic techniques": false,
      "exploration of fantasy life in light of ongoing anxieties": false,
      "exploration and interpretations of the transference": false,
      "exploration of fears of abandonment and loss as experienced in the transference": false,
      "exploration of fears of rejection and judgment as experienced in the transference": false,
      "exploration of the client's underlying sexual wishes and desires": false,
      "exploration of the client's underlying aggressive wishes and impulses": false,
      "psychodynamic listening": false,
      "exploration and interpretation of anxieties regarding boundaries within the therapeutic relationship and the frame": false,
      "exploration and interpretation of dream material with emphasis on awareness of underlying anxieties, desires and wishes": false,
      "interpretations of dream material with emphasis on manifest content and its relationship to current conflicts and concerns": false,
      "exploration and interpretations regarding possible resistances": false,
      "exploration and interpretations of underlying sexual anxieties and conflicts": false,
      "exploration and interpretation of underlying anxieties regarding loss and abandonment": false,
      "exploration and interpretation of underlying anxieties regarding fear of punishment, physical threat, and/or retaliation": false,
      "exploration and interpretation of underlying anxieties regarding destructive impulses and wishes": false,
      "exploration and interpretation of underlying annihilation anxiety and fears of fragmentation": false,
      "exploration and interpretations of underlying fears of engulfment and merger in relationships": false,
      "addressing defenses against aggressive impulses and desires": false,
      "addressing defenses against sexual impulses and desires": false,
      "exploration and interpretations of inhibitions regarding pleasure and enjoyment": false,
      "exploration and interpretations of inhibitions regarding self-expression and assertion": false,
      "an emphasis on support of defenses to contain impulse life and regressive experiences": false,
      "an emphasis on support of defenses to help contain regressive experiences": false,
      "exploration and interpretation of possible physical manifestations of psychic conflict and pain": false,
      "exploration and interpretation of psychosomatic concerns and difficulties": false,
      "exploration of self-destructive motives underlying acting-out behavior": false,
      "exploration of suicidal impulses in relation to unacknowledged and unmetabolized anger": false,
      "exploration and interpretation of projections that are interfering with social and interpersonal functioning": false,
    },
    "Other Interventions": {
      "discussion and establishment of plans and goals for better self-care": false,
      "a focus on anger management and containment of acting out": false,
      "exploration of appropriate interaction and communication": false,
      "focus on social skills enhancement and practice": false,
      "discussion of better life management and organization of projects": false,
      "exploration of means of overcoming phobic avoidance": false,
      "psychoeducation and instruction regarding panic attacks and their management": false,
      "instruction and management of sleep difficulties": false,
      "supportive psychoeducation regarding recovery from psychosis": false,
      "discussion of plans for drug cessation": false,
      "continued psychoeducation on addictions and their management": false,
      "discussion of ways of managing current crisis situation": false,
      "establishing a plan of how to proceed in the event of a suicidal crisis": false,
      "informing the client of how to reach me by telephone between sessions as needed": false,
      somatic: false,
      "active listening": false,
      "problem solving": false,
      education: false,
      "communication skills": false,
      "free expressions of feelings": false,
      "play therapy": false,
      "motivational interviewing": false,
      "strength building": false,
      "emotional awareness": false,
      "identifying consequences": false,
      "crisis intervention": false,
      "crisis support": false,
      support: false,
      "family involvement": false,
      "skill building": false,
      "address feelings and behaviors": false,
      "intake paperwork": false,
      "assessment of needs and issues": false,
      "continue addressing depression and suicide risk": false,
      "cognitive behavioral": false,
      "conflict resolution": false,
      "insight work": false,
      validation: false,
      feedback: false,
    },
  },
  "Ongoing Treatment": {
    All: {
      "continued support and maintenance of the psychotherapeutic process": false,
      "continued support of the client's self-exploration and understanding": false,
      "support of the client's capacity for thought and reflection": false,
      "building and development of safety and trust in the relationship with the therapist": false,
      "therapeutic work on building and maintaining self-esteem and self-confidence": false,
      "therapeutic work on building and maintaining self-care": false,
      "therapeutic interventions aimed at helping with target behaviors and difficulties": false,
      "addressing problematic coping strategies and mechanisms": false,
      "building greater social and interpersonal skills": false,
      "adjunctive psychiatric/medical assistance": false,
      "continued exploration of meaning and significance of client's difficulties in light of past relational patterns and underlying beliefs": false,
      "continued exploration of current life difficulties in light of early childhood experiences": false,
      "helping the client gain greater awareness of underlying fantasies, wishes, and fears": false,
      "exploration of meaning and significance of the client's difficulties iin light of psychic conflict": false,
      "better understanding the impact of the client's traumatic history on present day relationships and experiences": false,
      "helping the client gain greater awareness, understanding, and expression of underlying emotions": false,
      "therapeutic work on understanding, containment and management of self-destructive impulses and/or behaviors": false,
      "management of uncontained affects and drive states": false,
      "support of the client's adaptive defenses and/or coping capacities": false,
      "crisis management and supportive assistance": false,
      "movement toward termination of the treatment process": false,
      "planning for termination of the treatment": false,
    },
  },
};

const TREATMENT = {
  Diagnosis: {
    All: {
      "F43.22 - Adjustment disorder with anxiety": false,
      "F33.1 - Major depressive disorder, recurrent, moderate": false,
      "F43.12 - Post-traumatic stress disorder, chronic": false,
      "F43.20 - Adjustment disorder, unspecified": false,
      "Z63.0 - Problems in relationship with spouse or partner": false,
    },
  },
  "Presenting Problem": {
    "Adjustment disorder with anxiety": {
      "restlessness or feeling keyed up or on edge": false,
      "being easily fatigued/low energy": false,
      "difficulty concentrating or mind going blank": false,
      irritability: false,
      "muscle tension": false,
      "sleep disturbance": false,
      "uncontrollable worry/fear": false,
    },
  },
  Goal: {
    "Adjustment disorder with anxiety": {
      "identify anxiety triggers": false,
      "learn and utilize coping skills to reduce anxiety": false,
      "learn and utilize coping skills to improve social relationships in the next 12 months": false,
      "learn and utilize communication skills to improve her social relationships in the next 12 months": false,
      "explore concerns relating to parenting": false,
      "process and work through breakup": false,
      "research information on parenting and pregnancy": false,
    },
  },
  Objective: {
    "Adjustment disorder with anxiety": {
      "Identify anxiety triggers: Cx will do this in order to understand what causes their anxiety.": false,
      "Identify anxiety triggers: Cx will do this in order to reduce cognitive distortions and limiting beliefs.": false,
      "Learn and utilize coping skills to reduce anxiety: Cx will do this in order to engage in new social activities in the next 12 months.": false,
      "Learn and utilize coping skills to reduce anxiety: Cx will do this in order to decrease feelings of panic and constriction in their chest.": false,
      "Learn and utilize coping skills to reduce anxiety: Cx will do this in order to reduce the physical symptoms associated with anxiety.": false,
      "Learn and utilize coping skills to improve social relationships: Cx will do this in order to identify communication skills to improve social relationships in the next 12 months.": false,
      "Learn and utilize communication skills to improve her social relationships: Cx will do this in order to effectively address issues that are important to them in the next 12 months. Effectiveness being measured by how heard, understood, and validated they feel.": false,
      "Explore concerns relating to parenting.": false,
      "Process and work through breakup: Cx will do this in order to grieve the loss of the relationship.": false,
      "Identify anxiety triggers.": false,
      "Learn and utilize coping skills to reduce anxiety.": false,
      "Research information on parenting and pregnancy: Cx will do this in order to learn about the changes her body will experience and to better understand what parenthood entails": false,
    },
  },
  "Treatment Frequency": {
    All: {
      "Every week": false,
      "Every other week": false,
      "Once per month": false,
    },
  },
};

const App = () => {
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

  const [mode, setMode] = useState(
    localStorage.getItem("mode") || "assessment"
  );
  const [data, setData] = useState(undefined);
  const [section, setSection] = useState(undefined);
  const [subSection, setSubSection] = useState(undefined);
  const reset = (m) => {
    let set = ASSESSMENT;
    if (m === "assessment") set = ASSESSMENT;
    if (m === "treatment") set = TREATMENT;

    localStorage.setItem("mode", m);
    setMode(m);
    setData(set);
    setSection(Object.keys(set)[0]);
    setSubSection(Object.keys(set[Object.keys(set)[0]])[0]);
    setPreview(false);
  };

  const secs = () => Object.keys(data);
  const subs = (sec) => Object.keys(data[sec]);
  const allKeys = (sec, sub = undefined) => {
    const set =
      sub === undefined
        ? merge({}, ...Object.values(data[sec]))
        : data[sec][sub];
    return Object.keys(set);
  };
  const onKeys = (sec, sub = undefined) => {
    const set =
      sub === undefined
        ? merge({}, ...Object.values(data[sec]))
        : data[sec][sub];
    return Object.keys(set).filter((k) => set[k]);
  };
  const toggle = (sec, sub, key) => {
    setData({
      ...data,
      [sec]: {
        ...data[sec],
        [sub]: {
          ...data[sec][sub],
          [key]: !data[sec][sub][key],
        },
      },
    });
  };

  const prefixStrs = (prefix, items) => {
    if (items.length === 0) {
      return [];
    } else if (items.length === 1) {
      return [`${prefix} ${items[0]}.`];
    } else if (items.length === 2) {
      return [`${prefix} ${items[0]} and ${items[1]}.`];
    } else {
      return [`${prefix}: ${items.join(", ")}.`];
    }
  };

  const toSentence = (strs) => {
    return [strs]
      .flat()
      .map((x) => (x[x.length - 1] === "." ? x : `${x}.`))
      .join(" ");
  };

  const Assessment = () => {
    return (
      <>
        {onKeys("Heading", "Verification").length > 0 && (
          <>
            <b>Verification:</b> {onKeys("Heading", "Verification").join(", ")}
            <br />
            <br />
          </>
        )}

        {onKeys("Heading", "Risk Assessment").length > 0 && (
          <>
            <b>Risk Assessment:</b>{" "}
            {onKeys("Heading", "Risk Assessment").join(", ")}
            <br />
            <br />
          </>
        )}

        {toSentence([
          ...onKeys("New Clients", "All"),
          ...prefixStrs(
            "The client's affective and emotional state was reported to be",
            onKeys("Reported Affective")
          ),
          ...prefixStrs(
            "The client and I met in order to discuss",
            onKeys("Themes")
          ),
          ...prefixStrs(
            "Symptoms and presenting issues include",
            onKeys("Symptoms")
          ),
          ...prefixStrs(
            "The client's affective and emotional state appeared",
            onKeys("Objective", "Affective State")
          ),
          ...prefixStrs(
            "The client's mental state included",
            onKeys("Objective", "Mental State")
          ),
          ...onKeys("Assessment", "Global Assessment"),
          ...onKeys("Assessment", "Level of Functioning"),
          ...onKeys("Assessment", "Significant Developments"),
          ...prefixStrs(
            "The client",
            onKeys("Assessment", "Treatment Motivation")
          ),
          ...onKeys("Assessment", "Outstanding Issues"),
          ...prefixStrs(
            "The main therapeutic interventions consisted of",
            onKeys("Interventions")
          ),
          ...prefixStrs(
            "The ongoing treatment plan includes",
            onKeys("Ongoing Treatment")
          ),
        ])}
      </>
    );
  };

  const Treatment = () => {
    return (
      <>
        {onKeys("Diagnosis").length > 0 && (
          <>
            <b>Diagnosis:</b> {onKeys("Diagnosis").join(", ")}
            <br />
            <br />
          </>
        )}

        {onKeys("Presenting Problem").length > 0 && (
          <>
            <b>Presenting Problem</b>
            <br />
            <br />
            {onKeys(
              "Presenting Problem",
              "Adjustment disorder with anxiety"
            ) && (
              <>
                {toSentence(
                  prefixStrs(
                    "Adjustment disorder with anxiety as evidenced by",
                    onKeys(
                      "Presenting Problem",
                      "Adjustment disorder with anxiety"
                    )
                  )
                )}
                <br />
                <br />
              </>
            )}
          </>
        )}

        {onKeys("Goal").length > 0 && (
          <>
            <b>Goal</b>
            <br />
            <br />
            <ul>
              {onKeys("Goal").map((x) => {
                return <li key={x}>{toSentence(`Cx will ${x}`)}</li>;
              })}
            </ul>
            <br />
          </>
        )}

        {onKeys("Objective").length > 0 && (
          <>
            <b>Objective</b>
            <br />
            <br />
            <ul>
              {toPairs(
                groupBy(
                  onKeys("Objective").map((x) => split(x, ": ")),
                  (x) => x[0]
                )
              ).map(([group, items]) => {
                items = items.map(([k, v]) => v).filter((x) => !!x);
                return (
                  <li key={group}>
                    {items.length ? `${group}:` : toSentence(group)}
                    {items.length > 0 && (
                      <ul>
                        {items.map((x) => {
                          return <li key={x}>{toSentence(x)}</li>;
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <br />
          </>
        )}

        {onKeys("Treatment Frequency").length > 0 && (
          <>
            <b>Treatment Frequency</b>
            <br />
            <br />
            {toSentence(onKeys("Treatment Frequency"))}
            <br />
            <br />
          </>
        )}
      </>
    );
  };

  const Text = () => {
    var n = <></>;
    if (mode === "assessment") n = <Assessment />;
    if (mode === "treatment") n = <Treatment />;

    return (
      <>
        <div id="text-to-copy" className="mb-2">
          {n}
        </div>
        <div className="text-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              const node = document.getElementById("text-to-copy");
              const range = document.createRange();
              range.selectNode(node);
              const selection = window.getSelection();
              selection.removeAllRanges();
              selection.addRange(range);
              document.execCommand("copy");
              selection.removeAllRanges();
            }}
          >
            <i class="fa-solid fa-copy" /> Copy
          </button>
        </div>
      </>
    );
  };

  const Badge = ({ sec, sub }) => {
    const k = onKeys(sec, sub);

    if (k.length === 0) return;

    return (
      <span
        className={`badge ${
          (sub ? sub === subSection : sec === section)
            ? "bg-light text-dark"
            : "bg-dark text-light"
        }`}
      >
        {k.length}
      </span>
    );
  };

  if (!data) {
    reset(mode);
    return <></>;
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand" href="#">
            <i className="fa-solid fa-pen-nib me-2 ms-2" /> Note Architect
          </span>
          <div className="btn-toolbar" role="toolbar">
            <div className="btn-group">
              <button
                type="button"
                className={`btn ${
                  mode === "assessment" ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => reset("assessment")}
              >
                Assessment
              </button>
              <button
                type="button"
                className={`btn ${
                  mode === "treatment" ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => reset("treatment")}
              >
                Treatment
              </button>
            </div>

            <button
              type="button"
              className="btn bg-warning ms-2"
              onClick={() => reset(mode)}
            >
              Clear
            </button>
            {isMobile && (
              <button
                type="button"
                className="btn bg-white ms-2"
                onClick={() => setPreview(!preview)}
              >
                {preview ? "Edit" : "View"}
              </button>
            )}
          </div>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row h-100">
          {showOptions && (
            <div className="col pt-3 pb-3 border-end border-1">
              <div className="mb-2">
                {secs().map((x) => {
                  return (
                    <button
                      key={x}
                      type="button"
                      className={`btn me-1 mb-1 ${
                        x === section ? "btn-dark" : "btn-outline-dark"
                      }`}
                      onClick={() => {
                        setSection(x);
                        setSubSection(Object.keys(data[x])[0]);
                      }}
                    >
                      {x} <Badge sec={x} />
                    </button>
                  );
                })}
              </div>
              <div className="mb-2">
                {subs(section)
                  .filter((x) => x !== "All")
                  .map((x) => {
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
              {allKeys(section, subSection).map((x) => {
                const checked = data[section][subSection][x];

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
              <Text />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
