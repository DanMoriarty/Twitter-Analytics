import boto
from boto.ec2.regioninfo import RegionInfo

region=RegionInfo(name='melbourne', endpoint='nova.rc.nectar.org.au')

ec2_conn = boto.connect_ec2(aws_access_key_id='cc0ef0289cf342039560f622024b1df3',
aws_secret_access_key='562be3e40cbe41d7881b164a9726ace4', is_secure=True,
region=region, port=8773, path='/services/Cloud', validate_certs=False)

ec2_conn.run_instances('ami-df1ff7ec', key_name='tomstestkey',
instance_type='m2.medium',
security_groups=['default'])