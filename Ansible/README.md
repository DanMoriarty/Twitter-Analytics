# Ansible Deployment

### To run:
Specify the configuration to be produced:
  * Make a copy of tmp_settings.yml called settings.yml.
  * Update the file with the specified information.
  * Download an RC file from NeCTAR and source it on your local machine to export necessary environment variables.
  * Generate a keypair, and add paths in the settings file.
  * Export the environment variable ANSIBLE_HOST_KEY_CHECKING=False

Execute the command `ansible-playbook -i hosts --private-key <your-private-key> make_instances.yml`

Make sure this command is executed in the same directory as the settings, hosts and scripts.tar.gz files.
