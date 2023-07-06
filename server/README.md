# Mean Finance Server

This is a simple server to expose relevant information regarding Mean Finance. It's implemented with ExpressJS + Typescript.

## Running the server

NodeJS is needed to compile & run the server. It has been tested with version 16.20.1, though other versions may work too.

Once NodeJS is installed, remember to run `npm install` in the `server` folder.

### Starting the server

You can run, `npm run start` to start the server. It should start the server, listening in port 8081.

To test that the server is running correctly, you can go to http://localhost:8081/status.

## Server API

The server currently has two endpoints:
* GET `/status`: Returns server status.
* GET `/chains/:chainId/tokens`: Returns a list of all tokens currently supported by Mean Finance.

## Testing

Jest is used to write and run tests.

You can do `npm run test` to run the tests. Any file in the [test](test) folder that ends with `.spec.ts` will be considered for testing. If you need to add tests, you can add them following that convention.
