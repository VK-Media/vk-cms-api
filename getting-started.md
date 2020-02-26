---
description: A guide to getting started with using VK CMS
---

# Getting started

## Development

As explained earlier, the API is 100% decoupled from the actual backend dashboard, and therefore they have to be setup individually. To get the API up and running locally for development, all you have to do is start by cloning the official repository from [GitHub](https://github.com/VK-Media/vk-cms-api.git) by running the following command in a terminal:

```bash
git clone https://github.com/VK-Media/vk-cms-api.git
```

When you have cloned the repository, you have to create a `.env` file in the root directory of the project. The file must contain the following variables, for the system to work correctly:

| Key | Description |
| :--- | :--- |
| PORT | The port which the API will run on |
| MONGODB\_URL | The URL of your Mongo database \(including credentials\) |
| JWT\_SECRET | A secret for signing JSON Web Tokens used for authenticating users |

{% hint style="info" %}
The PORT environment variable is not required, the default port is _5000_
{% endhint %}

Once you have your environment ready, all you have to do is run the API with the following command:

```bash
npm run dev
```

When running the command, the API will attempt to connect to the database and it will load the configuration of core files, once this is done the API is ready to receive requests.

