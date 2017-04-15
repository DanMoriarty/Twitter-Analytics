import boto
from boto.ec2.regioninfo import RegionInfo

region=RegionInfo(name='melbourne', endpoint='nova.rc.nectar.org.au')

ec2_conn = boto.connect_ec2(aws_access_key_id='12093fd90f254a5488638d43496a96ce',
aws_secret_access_key='31e7b60a7ce040da9609a600e50d5161', is_secure=True,
region=region, port=8773, path='/services/Cloud', validate_certs=False)

ec2_conn.run_instances('ami-df1ff7ec', key_name='tomstestkey',
instance_type='m2.medium',
security_groups=['default'])