# Mario Kart World Lounge Stats Discord Widget
Display your Mario Kart World Lounge stats in a pretty Discord profile widget.

> [!CAUTION]
> This widget is subject to change, or stop working entirely, based on Discord's rollout of the custom widget feature.

![Screenshot of the Widget](screenshots/widget.png)
---
## Get Started


> [!IMPORTANT]
> Due to Discord limitations, there is no current way to update the widget of another user. This means in order to use this widget, it is required to create and configure a Discord developer application with widget enabled yourself. While I understand this is not feasible for most non-technical users, unfortunately that is the nature of unreleased features.
> 
> - [A guide to do this can be found here](https://chloecinders.com/blog/discord-widgets)

> [!CAUTION]
> Much of this process involves running someone else's code in your browser console, which can leave you vulnerable to attacks by malicious users. The widget itself is perfectly safe, though pasting and executing code in your browser console is generally not recommended for non-technical users. Please take the time to understand the code you are running before you run it. The source code of this widget is available in this repository for review, though the code snippets in the external guide provided should be reviewed before execution.

## Update `.env` (Required)*
> 1. Copy `.env.example` to `.env` and fill in each field.

## Create Fallback Asset (Required)*
> 1. While you're editing your widget's config, upload an asset called `loungeicon` to be used as the main image for the widget.

## Update Widget One Time (no live updates)
> 1. Copy the JSON snippet from below
> 2. Follow [this guide](https://chloecinders.com/blog/discord-widgets) to create your widget and enter the configuration screen.
> 3. Once in the config, press the 3 dots in the top right and choose `Paste config from clipboard` 
> 4. Choose `Save`, then `Publish` 
> 5. Clone this repository and enter the directory
> 6. Run `npm install` to install the NPM dependencies
> 7. Run `npm run sync` to push real Lounge data to the widget
> 8. Follow [these instructions](https://chloecinders.com/blog/discord-widgets#adding-the-widget-to-your-profile) to add the widget to your profile 

## Live Widget Updates
> [!IMPORTANT]
> This requires a way to run the script 24/7, which could be done by running it on startup, or hosting it on a server.

> 1. Copy the JSON snippet from below
> 2. Follow [this guide](https://chloecinders.com/blog/discord-widgets) to create your widget and enter the configuration screen.
> 3. Once in the config, press the 3 dots in the top right and choose `Paste config from clipboard` 
> 4. Choose `Save`, then `Publish` 
> 5. Clone this repository and enter the directory
> 6. Run `npm install` to install the NPM dependencies
> 7. Run `npm run track` to start sending real Lounge data to the widget on a 180-second interval
> 8. Follow [these instructions](https://chloecinders.com/blog/discord-widgets#adding-the-widget-to-your-profile) to add the widget to your profile 

The following JSON snippet will be used throughout setup:
```json
{
  "_type": "discord_widget_config",
  "surfaces": {
    "widget_bottom": {
      "layout": "widget_bottom_stats",
      "components": {
        "stat_5": {
          "fields": {
            "value": {
              "value_type": "data",
              "presentation_type": "number",
              "value": "events",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            },
            "label": {
              "value_type": "custom_string",
              "presentation_type": "text",
              "value": "Events Played"
            }
          }
        },
        "stat_6": {
          "fields": {
            "value": {
              "value_type": "data",
              "presentation_type": "text",
              "value": "winrate",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            },
            "label": {
              "value_type": "custom_string",
              "presentation_type": "text",
              "value": "Win Rate"
            }
          }
        },
        "stat_3": {
          "fields": {
            "value": {
              "value_type": "data",
              "presentation_type": "text",
              "value": "averages",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            },
            "label": {
              "value_type": "custom_string",
              "presentation_type": "text",
              "value": "Avg. / Partner Avg."
            }
          }
        },
        "stat_2": {
          "fields": {
            "value": {
              "value_type": "data",
              "presentation_type": "text",
              "value": "rank",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            },
            "icon": {
              "value_type": "data",
              "presentation_type": "image",
              "value": "rankicon"
            },
            "label": {
              "value_type": "custom_string",
              "presentation_type": "text",
              "value": "Rank"
            }
          }
        },
        "stat_4": {
          "fields": {
            "value": {
              "value_type": "data",
              "presentation_type": "text",
              "value": "peakmmr",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            },
            "label": {
              "value_type": "custom_string",
              "presentation_type": "text",
              "value": "Peak MMR"
            }
          }
        },
        "stat_1": {
          "fields": {
            "value": {
              "value_type": "data",
              "presentation_type": "text",
              "value": "mmr",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            },
            "label": {
              "value_type": "custom_string",
              "presentation_type": "text",
              "value": "MMR"
            }
          }
        }
      }
    },
    "mini_profile": {
      "layout": "mini_profile_hero_stat",
      "components": {
        "stat": {
          "fields": {
            "text": {
              "value_type": "data",
              "presentation_type": "text",
              "value": "mmr",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            },
            "icon": {
              "value_type": "data",
              "presentation_type": "image",
              "value": "rankicon",
              "fallback": {
                "value_type": "application_asset",
                "presentation_type": "image",
                "value": "loungeicon"
              }
            },
            "label": {
              "value_type": "custom_string",
              "presentation_type": "text",
              "value": "MMR"
            }
          }
        },
        "hero_image": {
          "fields": {
            "image": {
              "value_type": "application_asset",
              "presentation_type": "image",
              "value": "loungeicon"
            }
          }
        }
      }
    },
    "widget_top": {
      "layout": "widget_top_contained",
      "components": {
        "subtitle_2": {
          "fields": {
            "text": {
              "value_type": "data",
              "presentation_type": "text",
              "value": "gamemode",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            },
            "label": {
              "value_type": "custom_string",
              "presentation_type": "text",
              "value": "Game Mode"
            }
          }
        },
        "title": {
          "fields": {
            "text": {
              "value_type": "data",
              "presentation_type": "text",
              "value": "name",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            }
          }
        },
        "subtitle_1": {
          "fields": {
            "text": {
              "value_type": "data",
              "presentation_type": "number",
              "value": "season",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            },
            "label": {
              "value_type": "custom_string",
              "presentation_type": "text",
              "value": "Season"
            }
          }
        },
        "subtitle_3": {
          "fields": {
            "text": {
              "value_type": "data",
              "presentation_type": "text",
              "value": "globalrank",
              "fallback": {
                "value_type": "custom_string",
                "presentation_type": "text",
                "value": "Loading..."
              }
            },
            "label": {
              "value_type": "custom_string",
              "presentation_type": "text",
              "value": "Global Rank"
            }
          }
        },
        "contained_image": {
          "fields": {
            "image": {
              "value_type": "data",
              "presentation_type": "image",
              "value": "rankicon",
              "fallback": {
                "value_type": "application_asset",
                "presentation_type": "image",
                "value": "loungeicon"
              }
            }
          }
        }
      }
    },
    "add_widget_preview": {
      "layout": "add_widget_preview_contained",
      "components": {
        "contained_image": {
          "fields": {
            "image": {
              "value_type": "application_asset",
              "presentation_type": "image",
              "value": "loungeicon"
            }
          }
        }
      }
    }
  }
}
```

## FAQ
---

| Question | Answer |
|----------|--------|
| Is this against Discord TOS? Will it get me banned?         | No. We are using this feature how Discord intended it to be used, it's just unreleased to the public.       |
| Why can't I just click a link to add the widget to my profile?         | As Game Stat Widgets are currently unreleased, they are restricted. You can not currently edit the widget of another user.       |
| This is hard...         | It sure is! Unfortunately, that is the nature of using unreleased and undocumented features. Hopefully Discord doesn't kill this feature too and this won't be so hard in the future.       |
| Can you make me a widget for [enter game here]?         | Currently, no. Check back when the feature is fully released, as I may have more widgets available.         |

---

#### Made by @duckyyylol
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://ducky.wiki/travel/github) [![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://ducky.wiki/travel/discord) [![ducky](https://files.ducky.wiki/share/public_assets/ducky/DuckyBadge.svg)](https://ducky.wiki) [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q1I122WYHF)

*This project is open-source. You can do whatever you want with it. Discord custom widgets, however, are unreleased and subject to change. Please be respectful when making API requests.*
