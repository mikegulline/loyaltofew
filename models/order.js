import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    eventName: {
      type: 'String',
    },
    mode: {
      type: 'String',
    },
    createdOn: {
      type: 'Date',
    },
    content: {
      discounts: {
        type: ['Mixed'],
      },
      items: {
        type: ['Mixed'],
      },
      refunds: {
        type: 'Array',
      },
      taxes: {
        type: 'Array',
      },
      user: {
        id: {
          type: 'String',
        },
        email: {
          type: 'String',
        },
        creationDate: {
          type: 'Date',
        },
        mode: {
          type: 'String',
        },
        gravatarUrl: {
          type: 'String',
        },
        billingAddress: {
          fullName: {
            type: 'String',
          },
          firstName: {
            type: 'String',
          },
          name: {
            type: 'String',
          },
          company: {
            type: 'String',
          },
          address1: {
            type: 'String',
          },
          address2: {
            type: 'String',
          },
          fullAddress: {
            type: 'String',
          },
          city: {
            type: 'String',
          },
          country: {
            type: 'String',
          },
          postalCode: {
            type: 'String',
          },
          province: {
            type: 'String',
          },
          phone: {
            type: 'String',
          },
          vatNumber: {
            type: 'Mixed',
          },
        },
        shippingAddress: {
          fullName: {
            type: 'String',
          },
          firstName: {
            type: 'String',
          },
          name: {
            type: 'String',
          },
          company: {
            type: 'String',
          },
          address1: {
            type: 'String',
          },
          address2: {
            type: 'String',
          },
          fullAddress: {
            type: 'String',
          },
          city: {
            type: 'String',
          },
          country: {
            type: 'String',
          },
          postalCode: {
            type: 'String',
          },
          province: {
            type: 'String',
          },
          phone: {
            type: 'String',
          },
          vatNumber: {
            type: 'Mixed',
          },
        },
      },
      token: {
        type: 'String',
      },
      isRecurringOrder: {
        type: 'Boolean',
      },
      parentToken: {
        type: 'Mixed',
      },
      parentInvoiceNumber: {
        type: 'Mixed',
      },
      currency: {
        type: 'String',
      },
      creationDate: {
        type: 'Date',
      },
      modificationDate: {
        type: 'Date',
      },
      status: {
        type: 'String',
      },
      paymentStatus: {
        type: 'String',
      },
      email: {
        type: 'String',
      },
      billingAddress: {
        fullName: {
          type: 'String',
        },
        firstName: {
          type: 'String',
        },
        name: {
          type: 'String',
        },
        company: {
          type: 'String',
        },
        address1: {
          type: 'String',
        },
        address2: {
          type: 'String',
        },
        fullAddress: {
          type: 'String',
        },
        city: {
          type: 'String',
        },
        country: {
          type: 'String',
        },
        postalCode: {
          type: 'String',
        },
        province: {
          type: 'String',
        },
        phone: {
          type: 'String',
        },
        vatNumber: {
          type: 'Mixed',
        },
      },
      shippingAddress: {
        fullName: {
          type: 'String',
        },
        firstName: {
          type: 'String',
        },
        name: {
          type: 'String',
        },
        company: {
          type: 'String',
        },
        address1: {
          type: 'String',
        },
        address2: {
          type: 'String',
        },
        fullAddress: {
          type: 'String',
        },
        city: {
          type: 'String',
        },
        country: {
          type: 'String',
        },
        postalCode: {
          type: 'String',
        },
        province: {
          type: 'String',
        },
        phone: {
          type: 'String',
        },
        vatNumber: {
          type: 'Mixed',
        },
      },
      shippingAddressSameAsBilling: {
        type: 'Boolean',
      },
      creditCardLast4Digits: {
        type: 'Date',
      },
      trackingNumber: {
        type: 'Mixed',
      },
      trackingUrl: {
        type: 'Mixed',
      },
      shippingFees: {
        type: 'Number',
      },
      shippingProvider: {
        type: 'Mixed',
      },
      shippingMethod: {
        type: 'String',
      },
      shippingRateUserDefinedId: {
        type: 'String',
      },
      cardHolderName: {
        type: 'String',
      },
      paymentMethod: {
        type: 'String',
      },
      completionDate: {
        type: 'Date',
      },
      cardType: {
        type: 'String',
      },
      paymentGatewayUsed: {
        type: 'String',
      },
      taxProvider: {
        type: 'String',
      },
      lang: {
        type: 'String',
      },
      refundsAmount: {
        type: 'Number',
      },
      adjustedAmount: {
        type: 'Number',
      },
      finalGrandTotal: {
        type: 'Number',
      },
      totalNumberOfItems: {
        type: 'Number',
      },
      invoiceNumber: {
        type: 'String',
      },
      billingAddressComplete: {
        type: 'Boolean',
      },
      shippingAddressComplete: {
        type: 'Boolean',
      },
      shippingMethodComplete: {
        type: 'Boolean',
      },
      rebateAmount: {
        type: 'Number',
      },
      subtotal: {
        type: 'Number',
      },
      itemsTotal: {
        type: 'Number',
      },
      taxableTotal: {
        type: 'Number',
      },
      grandTotal: {
        type: 'Number',
      },
      total: {
        type: 'Number',
      },
      totalWeight: {
        type: 'Number',
      },
      totalRebateRate: {
        type: 'Number',
      },
      customFields: {
        type: ['Mixed'],
      },
      shippingEnabled: {
        type: 'Boolean',
      },
      numberOfItemsInOrder: {
        type: 'Number',
      },
      paymentTransactionId: {
        type: 'String',
      },
      metadata: {},
      taxesTotal: {
        type: 'Number',
      },
      itemsCount: {
        type: 'Number',
      },
      summary: {
        subtotal: {
          type: 'Number',
        },
        taxableTotal: {
          type: 'Number',
        },
        total: {
          type: 'Number',
        },
        payableNow: {
          type: 'Number',
        },
        paymentMethod: {
          type: 'String',
        },
        taxes: {
          type: 'Array',
        },
        adjustedTotal: {
          type: 'Number',
        },
        shipping: {
          type: 'Mixed',
        },
      },
      ipAddress: {
        type: 'String',
      },
      hasSubscriptions: {
        type: 'Boolean',
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
