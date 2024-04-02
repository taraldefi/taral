Generated certs with [mkcert](https://github.com/FiloSottile/mkcert) go here

How to generate these local certificates: 

1. `mkcert tariala.com api.tariala.com app.tariala.com db.tariala.com seq.tariala.com` will generate the `pem` and `key` certificates.

2. Rename them to `privkey.pem` and `fulllchain.pem`

3. Trust the certificates with `mkcert -install`. You can uninstall with `mkcert -uninstall`

4. Make sure to add these dns paths to the `/etc/hosts` file

e.g. add the following line: 

`127.0.0.1 tariala.com api.tariala.com app.tariala.com seq.tariala.com db.tariala.com`

