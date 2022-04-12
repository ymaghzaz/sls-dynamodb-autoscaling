import * as using from 'jasmine-data-provider'

import Name from '../../src/aws/name'

describe('Name', () => {
  describe('Everything', () => {
    const n = new Name({
      index: 'index',
      region: 'region',
      service: 'service',
      stage: 'stage',
      table: 'table'
    })

    const names = {
      dimension: 'dynamodb:index:WriteCapacityUnits',
      metricRead: 'DynamoDBReadCapacityUtilization',
      metricWrite: 'DynamoDBWriteCapacityUtilization',
      policyRole: 'serviceStageDynamoDBAutoscalePolicyTableIndexRegion',
      policyScaleRead: 'serviceStageTableScalingPolicyReadTableIndexRegion',
      policyScaleWrite: 'serviceStageTableScalingPolicyWriteTableIndexRegion',
      role: 'serviceStageDynamoDBAutoscaleRoleTableIndexRegion',
      targetRead: 'serviceStageAutoScalingTargetReadTableIndexRegion',
      targetWrite: 'serviceStageAutoScalingTargetWriteTableIndexRegion'
    }

    using(names, (data, name) => {
      it(name, () => {
        expect(n[name]()).toEqual(data)
      })
    })
  })

  describe('No Index', () => {
    const n = new Name({
      index: '',
      region: 'region',
      service: 'service',
      stage: 'stage',
      table: 'table'
    })

    const names = {
      dimension: 'dynamodb:table:WriteCapacityUnits',
      metricRead: 'DynamoDBReadCapacityUtilization',
      metricWrite: 'DynamoDBWriteCapacityUtilization',
      policyRole: 'serviceStageDynamoDBAutoscalePolicyTableRegion',
      policyScaleRead: 'serviceStageTableScalingPolicyReadTableRegion',
      policyScaleWrite: 'serviceStageTableScalingPolicyWriteTableRegion',
      role: 'serviceStageDynamoDBAutoscaleRoleTableRegion',
      targetRead: 'serviceStageAutoScalingTargetReadTableRegion',
      targetWrite: 'serviceStageAutoScalingTargetWriteTableRegion'
    }

    using(names, (data, name) => {
      it(name, () => {
        expect(n[name]()).toEqual(data)
      })
    })
  })

  describe('Truncation', () => {
    const n = new Name({
      index: '',
      region: 'region',
      service: 'service-with-a-very-long-name-so-names-are-truncated',
      stage: 'stage',
      table: 'table'
    })

    const names = {
      dimension: 'dynamodb:table:WriteCapacityUnits',
      metricRead: 'DynamoDBReadCapacityUtilization',
      metricWrite: 'DynamoDBWriteCapacityUtilization',
      policyRole: 'servicewithaverylongnamesonamesa2bcb95d8a6cddb530a6f372bb98fd2fd',
      policyScaleRead: 'servicewithaverylongnamesonamesab7e8255a41a14be3c63b5ef48b28b0af',
      policyScaleWrite: 'servicewithaverylongnamesonamesa12af4909663ed694a6a648bace6c061e',
      role: 'servicewithaverylongnamesonamesa5454ee18bd88bb23869d5be3c6c81382',
      targetRead: 'servicewithaverylongnamesonamesa3facc5ba65673e200b8ab7381437b1f0',
      targetWrite: 'servicewithaverylongnamesonamesadf44b7fef31e41b64cccef1255fff1d8'
    }

    using(names, (data, name) => {
      it(name, () => {
        expect(n[name]()).toEqual(data)
      })
    })
  })
})
