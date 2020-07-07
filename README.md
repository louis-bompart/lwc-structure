# Salesforce Package Development Model for ISV

## Preambule

- Must, may, should and other auxiliary verbs used in the present document follows the Indicate Requirement Levels defined in [RFC-2119](https://www.ietf.org/rfc/rfc2119.txt).

- Most of the present document apply for managed package developement for ISV, but you might find some practice and idea that can apply to your workflow nonetheless.

- The semantic used in this document does not necessarly reflect the official Salesforce linguo, and should not be used as a reference.

## Phase 0: The MDAPI structure

If your project is still structured around the MDAPI, you should really consider switching to the source format used in Salesforce DX projects.
Here's some links that might helps:
- [Salesforce DX Project Structure and Source Format](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_source_file_format.htm)
- [SDFX-CLI, mdapi Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_mdapi.htm)

## Phase 1: Monolithic XGP package and monolithic package directory structure

A monolithic package is a single package containing all your features.
A monolithic directory is constitued of a single **package directory** (a directory containing for example the `lwc` or `object` folder, in this repo, it'll be `force-app/main/default`).

It contains all the files related to your package in a single folder.

### Pro
- It's simple
- It's close to the MDAPI file structure (it'd be what you get from a `sfdx force:mdapi:convert` run even.)

### Con
- It's not scalable if you start getting a lot of feature: If you have two distinct feature set, you might want to split the files between those two feature set, but you won't be able to do so, because the subfolder of **package directory** are expecting files matching their names (so, LWC bundles in the lwc folder, Aura bundles in aura, but no LWC in a subfolder like `lwc/subfolder/myComponent`).
- You have a single big package, which can be cumbersome for your users (e.g. he might want less static resources)

## Phase 2: Monolithic XGP package and feature-oriented directory structure.

A feature-oriented directory structure apply the [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) design principle to the directory structure of your SalesforceDX project.
It splits the files in different folder depending on their "raison d'être", meaning that if two components/classes have no relations between them, they should certainly be split in different folders.

For example, if you have some LWC components specific to Salesforce Community, and others specific to Salesforce Lightning Console, they must not be in the same folder.

If they have shared code, the shared code must be split in an 'util' directory.

One can make multiple util directories. He should however apply the Separation of Concerns principle to thoses utils too.

For this phase, the `sfdx-project.json` should stays the same and target the `force-app` folder as a whole.
When using `sfdx force:source:push` or in the package, the files will still be the same as in Phase 1.

### Pro
- The development is scalable, as a developer, this should prevent you from getting lost in your files.
- It should represent better what the client care about and the different 'solutions' included in your package.


### Con
- It's far from the MDAPI file structure, so you might get confused at first if your used to the the latter.
- What you ship and what you code is different, which is something to keep in mind.
- You still have a single big package, which can be cumbersome for your users (e.g. he might want less static resources).
- It may still using First Generation Packaging.


## Phase 3: Monolithic 2GP and feature-oriented directory structure.

If you are already using 2GP in production, there's nothing new between Phase 2 and this one.

If not, this phase would mostly be the migration from the First Generation Packaging to the Second, however, not much information have been shared on the topic yet. We heard of a [developer preview for Summer '20 release](https://releasenotes.docs.salesforce.com/en-us/summer20/release-notes/rn_sfdx_packaging_preview_package_migration.htm), but that's mostly it.

From there, we're assuming that you're using a 2GP.

### Pro
- Same as Phase 2, but also:
- It's using the Second Generation Packaging, which allow way more flexible and simpler package creation (see [Comparison of 2GP and 1GP Managed Packages](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_dev2gp_comparison.htm))

### Con
- What you ship and what you code is different, which is something to keep in mind.
- You still have a single big package, which can be cumbersome for your users (e.g. he might want less static resources).


## Phase 4: Feature-oriented 2GPs and directory structure.

Finally, to ease the installation burden of your user, you can split your packages in smaller ones.

The directories created on phase 2 must now be defined as packages in the `sfdx-project.json`
Those packages must explicitly specified their dependencies in the `sfdx-project.json`

You should create 'empty' packages (later called 'feature set package') that group your features per use cases, for example if one of your personna is supposed to use multiple independent lightning components to have the best experience with one of your feature set, you should:
 - Split each of these independent lightning components in their own package
 - Have an empty package that define those packages as dependency.
You can also add an 'example' of how to use them, for example in the case of a record page, you could include a flexipage with your components properly integrated as an example.

For backward backward compatibility, you should create a main package that specify all the feature set packages as dependencies.

### Pro
- You ship smaller, self-contained features. That should allows better scalability, for the product and for your team. (i.e. more people can work on your project, and it can contains more stuff).
- Your source is finally what you ship. Huzzah!
- Your client can reduce their installation size by installing only what they need.

### Con
- You have a lot of different packages, you must stay vigilant about the Separation of Concern principle, or your project will become an utter mess.