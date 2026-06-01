<!--
{
  "availability" : [
    "Mac Catalyst: 16.0.0 -",
    "iOS: 16.0.0 -",
    "iPadOS: 16.0.0 -",
    "macOS: 13.0.0 -",
    "tvOS: 16.0.0 -",
    "visionOS: 1.0.0 -",
    "watchOS: 9.0.0 -"
  ],
  "documentType" : "symbol",
  "framework" : "AppIntents",
  "identifier" : "/documentation/AppIntents",
  "metadataVersion" : "0.1.0",
  "role" : "Framework",
  "symbol" : {
    "kind" : "Framework",
    "modules" : [
      "App Intents"
    ],
    "preciseIdentifier" : "AppIntents"
  },
  "title" : "App Intents"
}
-->

# App Intents

Make your app’s content and actions discoverable with system experiences like Spotlight, widgets, and the Shortcuts app.

## Overview

The App Intents framework provides functionality to deeply integrate your app’s actions and content with system experiences across platforms, including Siri, Spotlight, widgets, controls and more. With Apple Intelligence and enhancements to App Intents, Siri will suggest your app’s actions to help people discover your app’s features and gains the ability to take actions in and across apps.

![A hero image of an App Intents framework icon.](images/com.apple.AppIntents/app-intents-hero@2x.png)

By adopting the App Intents framework, you allow people to personalize their devices by instantly using your app’s functionality with:

- Interactions with Siri, including those that use the personal context awareness and action capabilities of Apple Intelligence.
- Spotlight suggestions and search.
- Actions and automations in the Shortcuts app.
- Hardware interactions that initiate app actions, like the Action button and squeeze gestures on Apple Pencil.
- Focus to allow people to reduce distractions.

> Note: Siri’s personal context understanding, onscreen awareness, and in-app actions are in development and will be available with a future software update.

For example, App Intents enables you to express your app’s actions, by offering an App Shortcut. People can then ask Siri to take those actions on their behalf, whether they’re in your app or elsewhere in the system. Use App Entities to expose content in your app to Spotlight and semantic indexing with Apple Intelligence. People can then ask Siri to retrieve information from your app, like asking Siri to pull up flight information from a travel app to share with a loved one.

You reuse these components with other technologies to offer additional features and experiences that make your app and its functionality even more discoverable and widely available. For example, you reuse modular App Intents code together with <doc://com.apple.documentation/documentation/WidgetKit> to offer:

- Interactive widgets
- Controls
- Live Activities

To learn more about features that the App Intents framework enables and how you can best adopt the framework, see [Making actions and content discoverable and widely available](/documentation/AppIntents/Making-actions-and-content-discoverable-and-widely-available).

For design guidance, see [Human Interface Guidelines > App Shortcuts](https://developer.apple.com/design/human-interface-guidelines/app-shortcuts), [Human Interface Guidelines > Siri](https://developer.apple.com/design/human-interface-guidelines/siri), and [Human Interface Guidelines > Action Button](https://developer.apple.com/design/human-interface-guidelines/action-button).

## Topics

### Essentials

  <doc://com.apple.documentation/documentation/Updates/AppIntents>

[Making actions and content discoverable and widely available](/documentation/AppIntents/Making-actions-and-content-discoverable-and-widely-available)

Adopt App Intents to make your app discoverable with Spotlight, controls, widgets, and the Action button.   

### System experiences

[Adopting App Intents to support system experiences](/documentation/AppIntents/adopting-app-intents-to-support-system-experiences)

Create app intents and entities to incorporate system experiences such as Spotlight, visual intelligence, and Shortcuts.   

[Making app entities available in Spotlight](/documentation/AppIntents/making-app-entities-available-in-spotlight)

Annotate your app entity types to support Spotlight indexing, and donate entities to
make them findable in searches.   

[Launching your voice-based conversational app from the side button of iPhone](/documentation/AppIntents/Launching-your-voice-based-conversational-app-from-the-side-button-of-iPhone)

Let people in Japan configure the side button of iPhone to launch your voice-based conversational app.

[Siri](/documentation/AppIntents/siri)

Let people complete tasks with voice commands, search, and other system experiences by integrating your app with Siri and Apple Intelligence.   

[Visual intelligence](/documentation/AppIntents/visual-intelligence)

Integrate your app with visual intelligence and include your content in its search results.   

[App Shortcuts](/documentation/AppIntents/app-shortcuts)

Integrate your app’s intents and entities with the Shortcuts app, Siri, Spotlight, and the Action button on supported iPhone and Apple Watch models.   

[Widgets, Live Activities, and controls](/documentation/AppIntents/widgets-and-live-activities)

Use app intents make your widgets and Live Activities interactive, offer controls, and suggest widgets in Smart Stacks.   

[Action button on iPhone and Apple Watch](/documentation/AppIntents/ActionButton)

Enable people to run your App Shortcuts with the Action button on iPhone or to start your app’s workout or dive sessions using the Action button on Apple Watch.   

[Focus](/documentation/AppIntents/focus)

Adjust your app’s behavior and filter incoming notifications when the
current Focus changes.   

### Actions

[Accelerating app interactions with App Intents](/documentation/AppIntents/AcceleratingAppInteractionsWithAppIntents)

Enable people to use your app’s features quickly through Siri, Spotlight, and Shortcuts.   

[Creating your first app intent](/documentation/AppIntents/Creating-your-first-app-intent)

Create your first app intent that makes your app available in system experiences like Spotlight or the Shortcuts app.   

[App intents](/documentation/AppIntents/app-intents)

Define the custom actions your app exposes to the system using specialized intents.   

[App intent domains](/documentation/AppIntents/app-intent-domains)

Make your app’s actions and content available to Siri and Apple Intelligence with assistant schemas.   

[Intent infrastructure](/documentation/AppIntents/intent-infrastructure)

Provide supplemental context for your intents, and create infrastructure to make app intents reusable across your apps.   

### Parameters and data types

[Adding parameters to an app intent](/documentation/AppIntents/Adding-parameters-to-an-app-intent)

Enable people to configure app intents with their custom input values.   

[Parameter resolution](/documentation/AppIntents/parameter-resolution)

Define the required parameters for your app intents and specify how to resolve
those parameters at runtime.   

[Resolvers](/documentation/AppIntents/resolvers)

Resolve the parameters of your app intents, and extend the standard resolution
types to include your app’s custom types.   

[Common data types](/documentation/AppIntents/common-data-types)

Specify common types that your app supports, including currencies,
files, and contacts.   

[App entities](/documentation/AppIntents/app-entities)

Make core types or concepts discoverable to the system by declaring
them as app entities.   

[Static parameter types](/documentation/AppIntents/app-enums)

Types that represent an enumerable list of static parameter values.   

[Entity queries](/documentation/AppIntents/entity-queries)

Help the system find the entities your app defines and use
them to resolve parameters.   

[Property comparators](/documentation/AppIntents/property-comparators)

Specify the type of comparison to perform during a property-matched query.   

### Outcomes

[Displaying static and interactive snippets](/documentation/AppIntents/displaying-static-and-interactive-snippets)

Enable people to view the outcome of an app intent and immediately perform follow-up actions.   

[`IntentDialog`](/documentation/AppIntents/IntentDialog)

The text you want the system to display, or speak, when requesting a value, asking for
disambiguation, or confirming an action.

[`IntentResult`](/documentation/AppIntents/IntentResult)

A type that contains the result of performing an action, and includes optional information to deliver back to the initiator.

[`IntentResultContainer`](/documentation/AppIntents/IntentResultContainer)

An object that represents the output of a completed intent.

[`OpensIntent`](/documentation/AppIntents/OpensIntent)

The result of performing an action that delivers an app intent back to the initiator of the action.

[`ProvidesDialog`](/documentation/AppIntents/ProvidesDialog)

The result of performing an action that delivers a dialog back to the initiator of the action.

[`ReturnsValue`](/documentation/AppIntents/ReturnsValue)

The result of performing an action that delivers a value back to the initiator.

[`ShowsSnippetIntent`](/documentation/AppIntents/ShowsSnippetIntent)

The result of performing an action that present a snippet generated by a `SnippetIntent`-conforming type.

[`ShowsSnippetView`](/documentation/AppIntents/ShowsSnippetView)

The result of performing an action that delivers a view back to the initiator of the action.

[`ResultsCollection`](/documentation/AppIntents/ResultsCollection)

A protocol representing a collection of returned items with support for sectioning.

### Choices and confirmation

[`IntentChoiceOption`](/documentation/AppIntents/IntentChoiceOption)

A structure representing an entry in a list of options for a person to choose from before an app intent resumes its action.

[`ConfirmationConditions`](/documentation/AppIntents/ConfirmationConditions)

Conditions for a confirmation request.

### Navigation and app launch

[`AppIntentSceneDelegate`](/documentation/AppIntents/AppIntentSceneDelegate)

Implement this protocol on your UIScene delegate to handle AppIntent invocations targeting a specific scene
Example:

[`IntentModes`](/documentation/AppIntents/IntentModes)

A set of options that describe an app intent’s behavior.

[`CustomURLRepresentationParameterConvertible`](/documentation/AppIntents/CustomURLRepresentationParameterConvertible)

### SiriKit migration

  <doc://com.apple.documentation/documentation/SiriKit/soup-chef-with-app-intents-migrating-custom-intents>   

[`CustomIntentMigratedAppIntent`](/documentation/AppIntents/CustomIntentMigratedAppIntent)

An interface for replacing a custom SiriKit intent that allows existing
shortcuts and donations to continue working.

### Errors

[`AppIntentError`](/documentation/AppIntents/AppIntentError)

Errors that your intent-handling code can return to indicate problems while interpreting or executing an app intent.



---

Copyright &copy; 2026 Apple Inc. All rights reserved. | [Terms of Use](https://www.apple.com/legal/internet-services/terms/site.html) | [Privacy Policy](https://www.apple.com/privacy/privacy-policy)
