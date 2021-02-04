# Grafana Custom ConnectALL plugin - Overview of CA Hierarchy plugin

#### The primary objective of this plugin is to project an hierarchial structure to the user who takes effect of our custom grafana plugin.

The data from the data source will flow in linearly pattern, for which the underlying logic groups the data in a hierarchial fashion. Say for example, your query is executed as in below:

```terminal
select level1, level2, level3, level4, level5 from hierarchy_structure;
```

The above query bring the tuples for various combinations of immediate parents, some may even group under a specific super parent.

End result of the hierarchy structure is as in below:

![Sample Depiction of the hierarchial structure](https://help.sap.com/doc/e2b9d153e8b34208e10000000a174cb4/1503%20SP%206/en-US/6f41d253913e4608e10000000a174cb4.gif)

# Grafana 7.3.0 - Custom Plugins

![Custom Grafana Plugin Development](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMM91EIu8C_Sa_Ap8VgmUOtHVaohH6qyzmzw&usqp=CAU)

## Running Grafana 7.3.0 in DEV mode

#### Pre-requisite:

```node
npm install go -g
npm install yarn -g
```
For mac users,

```terminal
brew install go
```
From the CA grafana repositpory
```git
git clone grafana 
```
After the repository is cloned, Navigate to the grafana-7.3.0, Execute the below command:
```git
yarn install

yarn build

-- After the above command is executed:

go run build.go setup

go run build.go build

-- Once the above command is executed u will notice the 'bin' directory is available.
-- For starting the grafana server, use the below command from the bin/darwinn-xxx

./grafana-server -config <GRAFANA_REPO>/grafana-7.3.0/conf/defaults.ini -homepath <GRAFANA_REPO>/grafana-7.3.0
```
Click the below to see the grafana in your local:

[grafana-local](https://localhost:3000/)

### Login Credentials:

#### username: admin | Password: admin

# Installing Custom Plugins in Grafana - Dev

Copy the plugins in this directory to the main grafana's plugin directory.

### Directory: 
<GRAFANA_REPO>/data/plugins

[For creating a plugin for yourself in Grafana, Refer here to the steps.](https://grafana.com/docs/grafana/latest/developers/plugins/)

[Grafana 7.0 Plugin Development Tutorial](https://youtu.be/4RLoHg4G9MI)

### Build and packaging

You can build & package your grafana plugin using the below command

```node
yarn build

mvn clean package
```

Note: We have disabled eslint validation in the react code owing to limitation in the yarn commands of 'dev' and 'build'. With the same in place you can execute the below commands during development from the plugin directory which you will be working with,

1. For installing the dependencies and setting up the yarn config file,

```node
yarn install
```

2. For development, 
	a. To have the plugin changes built locally & served use the below:
	
	```node
	yarn dev
	```
	b. To have the plugin changes to be loaded automatically or served in real time:
	
	```node
	yarn watch
	```
3. To build package for production

```node
yarn build
```

4. To pack the content for production

```node
mvn clean package
```

The zip archive can be shipped for deployment into the grafana software's directory -> <GRAFANA_REPO>/data/plugin/
