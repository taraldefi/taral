# Insomnia collections

This folder contains collections on how to interact with the different backends.

The included collections work with [Insomnia](https://insomnia.rest/download)

## Important

Data like `IDs` in case of `GET` or `UPDATE` operations is obviously not valid and needs to be replaced with valid `ID` resulted after creating the respective asset through a `POST` call. 

Generally all the backends follow the `CRUD` pattern: 

* Use the `POST` request method to create an asset. Generally the response will contain the `ID` of that respective asset which can be used for further operations. The operation will return the (full) asset details

* Use the `PATCH` request method to update/patch an asset. For this method one usually needs to use the `ID` of the specific asset and the collection of fields that were modified. Unmodified fields can be skipped from the `PATCH` request. The operation will return the modified (full) asset details

* Use the `DELETE` request method for deleting an asset. For this method one usually needs to use the `ID` of the specific asset. The operation will return nothing, signalling the success of the operation through the HTTP status code. 

* Use the `GET` request method to get the details of an asset. For this method one usually needs to use the `ID` of the specific asset. The operation will return the (full) asset details

