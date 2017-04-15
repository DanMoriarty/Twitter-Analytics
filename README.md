# CCC_project2

### To run:
Specify the configuration to be produced:
  * Make a copy of tmp_settings.yml called settings.yml.
  * Update the file with the specified information.
  * Generate an OpenStack API password from the 'settings' tab on NeCTAR, this is the 'password' attribute in the settings file.
  * Generate a keypair on NeCTAR.  The name of this keypair is the 'keypair-name' attribute, and a path to the private key file (e.g. 'mykey.key') is the 'secret_key' attribute.
  * Initially, recommended configuration is 4 nodes, running m2.medium flavors. Or, on your personal project, 2 nodes running m2.small instances.

Execute the command `ansible-playbook -i hosts make_instances.yml`
