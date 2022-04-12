import Role from '../../src/aws/role'

describe('Role', () => {
  it('creates CF resource', () => {
    const r = new Role({
      index: 'index',
      region: 'region',
      service: 'service',
      stage: 'stage',
      table: 'MyTableResource'
    })

    const j = r.toJSON()

    expect(j).toHaveProperty('serviceStageDynamoDBAutoscaleRoleMyTableResourceIndexRegion')
  })

  it('truncates role name if needed', () => {
    const r = new Role({
      index: 'index',
      region: 'region',
      service: 'service-with-a-long-name-to-force-truncation',
      stage: 'stage',
      table: 'MyTableResource'
    })

    const j = r.toJSON()

    expect(j).toHaveProperty('servicewithalongnametoforcetrunc16659a706c56f93a2a04f1d443b29aa2')
  })
})
